import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>().basePath('/api/v1');


app.use('/blog/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if(!jwt) {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }
    const token = jwt.split(" ");
    if(token[0] !== "Bearer ") {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }
    const id = await verify(token[1], c.env.JWT_SECRET);
    if(!id) {
        c.status(401);
        return c.json({ Error: "Unauthorized" });
    }
    await next();
})

app.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();

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
app.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();
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
app.post('/blog', (c) => c.text('Post blog')) 
app.put('/blog', (c) => c.text('put blog')) 
app.get('/blod/:id', (c) => c.text('blog id  ')) 

export default app
