import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id');
export const postIdSchema = z.object({ postId: objectId });
export const createPostSchema = z.object({
  content: z.string().trim().min(1).max(5000)
});
export const updatePostSchema = z.object({
  content: z.string().trim().min(1).max(5000).optional()
}).refine((data) => Object.keys(data).length > 0, 'Provide content to update');
