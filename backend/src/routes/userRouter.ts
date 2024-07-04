import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { singinInput, singupInput } from "getblog-common";
import { hash, compareSync  } from 'bcrypt-ts';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success, data } = singupInput.safeParse(body);
        if (!success) {
            c.status(402);
            return c.json({ error: "Please enter valid input" });
        }
        const { email, password, name } = data;
        const userExistInDB = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (userExistInDB) {
            return c.json({ message: "User already exists in our database" });
        }
        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
        return c.json({ token });
    } catch (error) {
        console.error("Error in signup:", error);
        c.status(500);
        return c.json({ error: "Internal server error" });
    }
});

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success, data } = singinInput.safeParse(body);
        if (!success) {
            c.status(402);
            return c.json({ error: "Please enter valid input" });
        }
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            c.status(403);
            return c.json({ error: "Invalid Credentials" });
        }
        const passwordMatch = compareSync(password, user.password);
        if (!passwordMatch) {
            c.status(403);
            return c.json({ error: "Invalid Credentials" });
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token });
    } catch (error) {
        console.error("Error in signin:", error);
        c.status(500);
        return c.json({ error: "Internal server error" });
    } 
});

userRouter.get('/getUserData', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }

    const tokenParts = jwt.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }

    try {
        const payload = await verify(tokenParts[1], c.env.JWT_SECRET) as { id: string };
        if (!payload.id) {
            c.status(401);
            return c.json({ Error: "Unauthorized" });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            },
            select: {
                id: true,
                name: true
            }
        });
        if (!user) {
            c.status(404);
            return c.json({ Error: "User not found" });
        }
        c.status(200);
        return c.json({ user });
    } catch (error) {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }
});

userRouter.get('/getUserDatabyId/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = await c.req.param('id');
        const response = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });
        c.status(200);
        return c.json({ response });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Internal server error" });
    }
});