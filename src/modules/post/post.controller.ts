import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { responseFormatter } from '../../middleware/response.middleware.js';
import { validation } from '../../middleware/validation.middleware.js';
import type { CreatePostDto, UpdatePostDto } from './dto/post.dto.js';
import { postService } from './post.service.js';
import { createPostSchema, postIdSchema, updatePostSchema } from './post.validation.js';

const router = Router();
router.use(authMiddleware);

router.post('/', validation(createPostSchema), responseFormatter((req) => postService.create(req.auth!.userId, req.body as CreatePostDto), 201));
router.get('/', responseFormatter((req) => postService.getMyPosts(req.auth!.userId)));
router.get('/:postId', validation(postIdSchema, 'params'), responseFormatter((req) => postService.getById(String(req.params.postId))));
router.patch('/:postId', validation(postIdSchema, 'params'), validation(updatePostSchema), responseFormatter((req) => postService.update(req.auth!.userId, String(req.params.postId), req.body as UpdatePostDto)));
router.delete('/:postId', validation(postIdSchema, 'params'), responseFormatter((req) => postService.delete(req.auth!.userId, String(req.params.postId))));

export default router;
