import bcrypt from 'bcrypt';
import { Schema, model, Document, Model } from 'mongoose';

/**
 * User model interface required for user update, where ID will be the finder.
 *
 * @export
 * @interface IUserUpdate
 * @extends {Document}
 */
export interface IUserUpdate extends Document {
  /**
   * User's email
   *
   * @type {string}
   * @memberof IUserUpdate
   */
  email: string;
  /**
   * User's username
   *
   * @type {string}
   * @memberof IUserUpdate
   */
  username: string;
};

/**
 * Extends the user update interface and includes password for user creation
 *
 * @export
 * @interface IUser
 * @extends {IUserUpdate}
 */
export interface IUser extends IUserUpdate {
  /**
   * User's password
   *
   * @type {string}
   * @memberof IUser
   */
  password: string;
};


/**
 * User model with additional methods
 *
 * @export
 * @interface IUserModel
 * @extends {IUser}
 */
export interface IUserModel extends IUser {
  /**
   * The interface to validate user's password
   *
   * @param {string} password
   * @returns {boolean}
   * @memberof IUserModel
   */
  validatePassword(password: string): boolean;
}

export const UserSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
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

UserSchema.pre('save', async function (this: any, next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);