import bcrypt from 'bcrypt';
import { Schema, model, Document, Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { jwtSecret } from '../config';

/**
 *
 *
 * @export
 * @interface IUserUpdate
 * @extends {Document}
 */
export interface IUserUpdate extends Document {
  email: string;
  username: string;
};

/**
 *
 *
 * @export
 * @interface IUser
 * @extends {IUserUpdate}
 */
export interface IUser extends IUserUpdate {
  password: string;
};


/**
 *
 *
 * @export
 * @interface IUserModel
 * @extends {IUser}
 */
export interface IUserModel extends IUser {
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

UserSchema.pre('save', async (next) => {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  const match = await bcrypt.compare(password, this.password);
  return match;
}

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return sign({
    email: this.email,
    id: this._id,
    exp: expirationDate.getTime() / 1000
  }, jwtSecret);
}

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);