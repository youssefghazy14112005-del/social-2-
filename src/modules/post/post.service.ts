import { Types } from 'mongoose';
import { ForbiddenException, NotFoundException } from '../../common/exception/domain.exception.js';
import { postRepository } from '../../common/repository/post.repository.js';
import type { CreatePostDto, UpdatePostDto } from './dto/post.dto.js';

class PostService {
  async create(userId: string, data: CreatePostDto) {
    const post = await postRepository.createOne({ userId: new Types.ObjectId(userId), content: data.content });
    return this.toPost(post);
  }

  async getMyPosts(userId: string) {
    const posts = await postRepository.findByUserId(userId);
    return posts.map((post) => this.toPost(post));
  }

  async getById(postId: string) {
    const post = await postRepository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    return this.toPost(post);
  }

  async update(userId: string, postId: string, data: UpdatePostDto) {
    const post = await postRepository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (post.userId.toString() !== userId) throw new ForbiddenException('Only the post owner can update this post');
    Object.assign(post, data);
    await post.save();
    return this.toPost(post);
  }

  async delete(userId: string, postId: string) {
    const post = await postRepository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (post.userId.toString() !== userId) throw new ForbiddenException('Only the post owner can delete this post');
    await postRepository.deleteOne({ _id: post._id });
    return { id: post._id.toString() };
  }

  private toPost(post: { _id: Types.ObjectId; userId: Types.ObjectId; content: string; createdAt?: Date; updatedAt?: Date }) {
    return {
      id: post._id.toString(),
      userId: post.userId.toString(),
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
  }
}

export const postService = new PostService();
