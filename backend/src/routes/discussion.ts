import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { discussionInput } from "getblog-common";
import { verify } from 'hono/jwt';

export const discussionRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

discussionRouter.get('/:postId', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const postId = await c.req.param('postId');
        console.log(postId);
        const response = await prisma.discussion.findMany({
            where: {
                postId
            }
        });
        c.status(200);
        return c.json({ response });
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ error: "Internal server error" });
    }
});

discussionRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        console.log(body);
        const { success, data } = discussionInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "Please enter valid input" });
        }
        const jwt = await c.req.header('Authorization');
        console.log(jwt);

        if (!jwt) {
            c.status(401);
            return c.json({ Error: "Unauthorized" });
        }

        const tokenParts = jwt.split(" ");
        if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
            c.status(401);
            return c.json({ Error: "Unauthorized" });
        }

        const payload = await verify(tokenParts[1], c.env.JWT_SECRET) as { id: string };
        if (!payload.id) {
            c.status(401);
            return c.json({ Error: "Unauthorized" });
        }
        const authorId = payload.id;
        const { comment, postId } = data;
        const response = await prisma.discussion.create({
            data: {
                comment,
                postId,
                authorId,
                date: new Date()
            }
        });
        c.status(200);
        return c.json({ message: response });
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ error: "Internal server error" });
    }
});

discussionRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const { id } = await c.req.param();
        const response = await prisma.discussion.delete({
            where: {
                id
            }
        })
        c.status(200);
        return c.json({ response });
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ error: "Internal server error" });
    }
})