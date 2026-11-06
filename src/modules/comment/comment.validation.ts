import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id');
export const postIdSchema = z.object({ postId: objectId });
export const commentIdSchema = z.object({ commentId: objectId });
export const createCommentSchema = z.object({
  content: z.string().trim().min(1).max(2000)
});
export const updateCommentSchema = z.object({
  content: z.string().trim().min(1).max(2000).optional()
}).refine((data) => Object.keys(data).length > 0, 'Provide content to update');
