import z from 'zod';

export const singupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
});

export const singinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export const discussionInput = z.object({
    comment: z.string().min(1),
    postId: z.string(),
})

export type singupInput = z.infer<typeof singupInput>
export type singinInput = z.infer<typeof singinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type DiscussionInput = z.infer<typeof discussionInput>