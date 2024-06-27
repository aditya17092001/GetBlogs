import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { singinInput, singupInput } from "getblog-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = singupInput.safeParse(body);
    if(!success) {
        c.status(402);
        return c.json({ Error: "Please enter a valid input" });
    }
    const userExistInDB = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });
    if(userExistInDB) {
        return c.json({ Message: "User already exist in our database"})
    }
    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
            name: body.name
        },
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
})  

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();
    const { success } = singinInput.safeParse(body);
    if(!success) {
        c.status(402);
        return c.json({ Error: "Please enter a valid input" });
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    if(!user) {
        c.status(403);
        return c.json({ Error: "Invalid Credentials" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
});

// userRouter.get('/getUserData', async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate());
//     const jwt = c.req.header('Authorization');
//     if(!jwt) {
//         c.status(401);
//         return c.json({ Error: "Unauthorized" });
//     }
//     const token = jwt.split(" ");
//     if(token[0] !== "Bearer") {
//         c.status(401);
//         return c.json({ Error: "Unauthorized" });
//     }
//     try {
//         const { id } = await verify(token[1], c.env.JWT_SECRET);
//         if(!id) {
//             c.status(401);
//             return c.json({ Error: "Unauthorized" });
//         }
//         else {
//             const user = await prisma.user.findUnique({
//                 where: {
//                     id
//                 },
//                 select: {
//                     id: true,
//                     name: true
//                 }
//             })
//             c.status(200);
//             return c.json({ user });
//         }
//     } catch (error) {
//         c.status(401);
//         return c.json({ Error: "Unauthorized" });
//     }
// });


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