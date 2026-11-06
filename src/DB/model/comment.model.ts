import { model, Schema, Types } from 'mongoose';

export interface ICommentRaw {
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
}

const commentSchema = new Schema<ICommentRaw>({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  content: { type: String, required: true, trim: true, minlength: 1, maxlength: 2000 }
}, { timestamps: true });

commentSchema.index({ postId: 1, createdAt: 1 });

export const CommentModel = model<ICommentRaw>('Comment', commentSchema);
