import { model, Schema, Types } from 'mongoose';

export interface IPostRaw {
  userId: Types.ObjectId;
  content: string;
}

const postSchema = new Schema<IPostRaw>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  content: { type: String, required: true, trim: true, minlength: 1, maxlength: 5000 }
}, { timestamps: true });

postSchema.index({ userId: 1, createdAt: -1 });

export const PostModel = model<IPostRaw>('Post', postSchema);
