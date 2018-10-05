import { Schema, model, Document, Model } from 'mongoose';

/**
 * Subscriber model interface required for subscriber update, where ID will be the finder.
 *
 * @export
 * @interface ISubscriberUpdate
 * @extends {Document}
 */
export interface ISubscriberModel extends Document {
  /**
   * Subscriber's email
   *
   * @type {string}
   * @memberof ISubscriberUpdate
   */
  email: string;
  /**
   * Subscriber's subscribername
   *
   * @type {string}
   * @memberof ISubscriberUpdate
   */
  name: string;

  subscribed: boolean;
};

export const SubscriberSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  subscribed: {
    type: Boolean
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

export const Subscriber: Model<ISubscriberModel> = model<ISubscriberModel>('Subscriber', SubscriberSchema);