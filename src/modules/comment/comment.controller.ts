import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { responseFormatter } from '../../middleware/response.middleware.js';
import { validation } from '../../middleware/validation.middleware.js';
import type { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto.js';
import { commentService } from './comment.service.js';
import { commentIdSchema, createCommentSchema, postIdSchema, updateCommentSchema } from './comment.validation.js';

const router = Router();
router.use(authMiddleware);

router.post('/posts/:postId/comments', validation(postIdSchema, 'params'), validation(createCommentSchema), responseFormatter((req) => commentService.create(req.auth!.userId, String(req.params.postId), req.body as CreateCommentDto), 201));
router.get('/posts/:postId/comments', validation(postIdSchema, 'params'), responseFormatter((req) => commentService.getByPostId(String(req.params.postId))));
router.get('/comments/:commentId', validation(commentIdSchema, 'params'), responseFormatter((req) => commentService.getById(String(req.params.commentId))));
router.patch('/comments/:commentId', validation(commentIdSchema, 'params'), validation(updateCommentSchema), responseFormatter((req) => commentService.update(req.auth!.userId, String(req.params.commentId), req.body as UpdateCommentDto)));
router.delete('/comments/:commentId', validation(commentIdSchema, 'params'), responseFormatter((req) => commentService.delete(req.auth!.userId, String(req.params.commentId))));

export default router;
