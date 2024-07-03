import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { discussionInput } from "getblog-common";

export const discussionRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

discussionRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { postId } = body;
        const response = await prisma.discussion.findMany({
            where: {
                postId
            }
        });
        c.status(200);
        return c.json({ response });
    } catch (error) {
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
        const { success, data } = discussionInput.safeParse(body);
        if (!success) {
            c.status(402);
            return c.json({ error: "Please enter valid input" });
        } 
        const { comment, postId, authorId } = data;
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

discussionRouter.delete('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const { id } = await c.req.json();
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