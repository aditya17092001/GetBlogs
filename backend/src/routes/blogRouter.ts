import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "getblog-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if(!jwt) {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }
    const token = jwt.split(" ");
    if(token[0] !== "Bearer") {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }
    try {
        const id = await verify(token[1], c.env.JWT_SECRET);
        if(!id) {
            c.status(401);
            return c.json({ Error: "Unauthorized" });
        }
        // @ts-ignore
        c.set("userId", id);
        await next();
    } catch (error) {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }
})


blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const { success } = createBlogInput.safeParse(body);
        if(!success) {
            c.status(411);
            return c.json({ Error: "Please enter the valid input" });
        }
        const userId = c.get("userId");
        // @ts-ignore
        const id = (userId.id);
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: id,
                date: new Date()
            }
        });
        return c.json({ blogId: blog.id });
    } catch (error) {
        c.status(500);
        return c.json({ Error: "Internal Server Error" });
    }     
});

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const { success } = updateBlogInput.safeParse(body);
        if(!success) {
            c.status(411);
            return c.json({ Error: "Please enter the valid input" });
        }
        const userId = c.get("userId");
        // @ts-ignore
        const id = (userId.id);
        const blog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: id
            },
            data: {
                title: body.title,
                content: body.content,
                date: new Date()
            }
        });
        c.status(200);
        return c.json({ blogId: blog.id });
    } catch (error) {
        c.status(500);
        return c.json({ Error: "Internal Server Error" });
    }
    
});

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                date: true,
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });
        return c.json({ blogs });
    } catch (error) {
        c.status(411)
        return c.json({ message: "Error while fetching blogs" });
    }
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogId = await c.req.param('id');
        const post = await prisma.post.findUnique({
            where: {
                id: blogId
            },
            select: {
                id: true,
                title: true,
                content: true,
                date: true,
                author: {
                    select: {
                        name: true,
                        id: true
                    }

                }
            }
        });
        return c.json({ post });
    } catch (error) {
        c.status(411)
        return c.json({ message: "Error while fetching blog post" });
    }
});


blogRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogId = await c.req.param('id');
        const blog = await prisma.post.findUnique({
            where: {
                id: blogId
            }
        });

        const userId = c.get("userId");
        // @ts-ignore
        const id = (userId.id);
        console.log(id+", "+typeof(id));
        console.log(blog?.authorId+", "+typeof(blog?.authorId));
        if(blog?.authorId != id) {
            c.status(401);
            return c.json({ message: "Unauthorized" });
        }
        const response = await prisma.post.delete({
            where: {
                id: blogId
            }
        })
        c.status(200);
        return c.json({ response });
    } catch(e) {
        console.log(e);
        c.status(500);
        return c.json({ message: "Error while deleting blog post" });
    }
});
