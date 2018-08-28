import { Schema, model, Document, Model } from 'mongoose';

/**
 * Gallery model interface required for gallery update, where ID will be the finder.
 *
 * @export
 * @interface IGalleryModel
 * @extends {Document}
 */
export interface IGalleryModel extends Document {
  /**
   * Gallery's name
   *
   * @type {string}
   * @memberof IGalleryModel
   */
  name: string;
  /**
   * Gallery's filename
   *
   * @type {string}
   * @memberof IGalleryModel
   */
  filename: string;

  path: string;

  tags: string[];

  thumbnail: string;
};

export const GallerySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  filename: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  tags: {
    type: [String]
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

GallerySchema.pre('save', async function (this: any, next) {
  // create/update thumbnail if image is updated
});

export const Gallery: Model<IGalleryModel> = model<IGalleryModel>('Gallery', GallerySchema);