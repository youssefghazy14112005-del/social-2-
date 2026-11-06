import { CommentModel, type ICommentRaw } from '../../DB/model/comment.model.js';
import { DatabaseRepository } from './base.repository.js';

export class CommentRepository extends DatabaseRepository<ICommentRaw> {
  constructor() { super(CommentModel); }

  findByPostId(postId: string) {
    return this.model.find({ postId }).sort({ createdAt: 1 });
  }
}

export const commentRepository = new CommentRepository();
