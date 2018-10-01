import bcrypt from 'bcrypt';
import { Schema, model, Document, Model } from 'mongoose';

/**
 * Category model interface required for category update, where ID will be the finder.
 *
 * @export
 * @interface ICategoryUpdate
 * @extends {Document}
 */
export interface ICategoryUpdate extends Document {
  /**
   * Category's name
   *
   * @type {string}
   * @memberof ICategoryUpdate
   */
  name: string;
  /**
   * Category's description
   *
   * @type {string}
   * @memberof ICategoryUpdate
   */
  description: string;
};

/**
 * Extends the category update interface
 *
 * @export
 * @interface ICategory
 * @extends {ICategoryUpdate}
 */
export interface ICategory extends ICategoryUpdate {
  
};


/**
 * Category model with additional methods
 *
 * @export
 * @interface ICategoryModel
 * @extends {ICategory}
 */
export interface ICategoryModel extends ICategory {
  
}

export const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const Category: Model<ICategoryModel> = model<ICategoryModel>('Category', CategorySchema);