import { Types } from 'mongoose';
import { ForbiddenException, NotFoundException } from '../../common/exception/domain.exception.js';
import { commentRepository } from '../../common/repository/comment.repository.js';
import { postRepository } from '../../common/repository/post.repository.js';
import type { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto.js';

class CommentService {
  async create(userId: string, postId: string, data: CreateCommentDto) {
    const post = await postRepository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    const comment = await commentRepository.createOne({
      postId: post._id,
      userId: new Types.ObjectId(userId),
      content: data.content
    });
    return this.toComment(comment);
  }

  async getByPostId(postId: string) {
    const post = await postRepository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    const comments = await commentRepository.findByPostId(postId);
    return comments.map((comment) => this.toComment(comment));
  }

  async getById(commentId: string) {
    const comment = await commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    return this.toComment(comment);
  }

  async update(userId: string, commentId: string, data: UpdateCommentDto) {
    const comment = await commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId.toString() !== userId) throw new ForbiddenException('Only the comment owner can update this comment');
    Object.assign(comment, data);
    await comment.save();
    return this.toComment(comment);
  }

  async delete(userId: string, commentId: string) {
    const comment = await commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    const post = await postRepository.findById(comment.postId.toString());
    if (!post) throw new NotFoundException('Post not found');
    const isCommentOwner = comment.userId.toString() === userId;
    const isPostOwner = post.userId.toString() === userId;
    if (!isCommentOwner && !isPostOwner) {
      throw new ForbiddenException('Only the comment owner or post owner can delete this comment');
    }
    await commentRepository.deleteOne({ _id: comment._id });
    return { id: comment._id.toString() };
  }

  private toComment(comment: { _id: Types.ObjectId; postId: Types.ObjectId; userId: Types.ObjectId; content: string; createdAt?: Date; updatedAt?: Date }) {
    return {
      id: comment._id.toString(),
      postId: comment.postId.toString(),
      userId: comment.userId.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    };
  }
}

export const commentService = new CommentService();
