import { PostModel, type IPostRaw } from '../../DB/model/post.model.js';
import { DatabaseRepository } from './base.repository.js';

export class PostRepository extends DatabaseRepository<IPostRaw> {
  constructor() { super(PostModel); }

  findByUserId(userId: string) {
    return this.model.find({ userId }).sort({ createdAt: -1 });
  }
}

export const postRepository = new PostRepository();
