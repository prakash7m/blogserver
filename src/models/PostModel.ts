import bcrypt from 'bcrypt';
import { Schema, model, Document, Model } from 'mongoose';

/**
 * Post model interface required for post update, where ID will be the finder.
 *
 * @export
 * @interface IPostModel
 * @extends {Document}
 */
export interface IPostModel extends Document {
  /**
   * Post's title
   *
   * @type {string}
   * @memberof IPostUpdate
   */
  title: string;
  /**
   * Post's synopsis
   *
   * @type {string}
   * @memberof IPostUpdate
   */
  synopsis: string;
  slug: string;
  content?: string;
  hero?: string;
  category?: string[];
  active?: boolean;
  user?: string;
  created?: string;
  updated?: string;
  meta?: string;
  stars?: number;
  readtime?: number;
  views?: number;
};

export const PostSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  synopsis: { type: String, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  content: { type: String, trim: true },
  hero: { type: Schema.Types.ObjectId, ref: 'Media' },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  active: { type: Boolean },
  user: { type: Schema.Types.ObjectId, ref: 'User' },  
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  meta: { type: String, trim: true },
  stars: { type: Number },
  readtime: { type: Number },
  views: { type: Number }
});

export const Post: Model<IPostModel> = model<IPostModel>('Post', PostSchema);