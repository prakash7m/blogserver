import { User } from "../models/UserModel";
import { injectable } from "inversify";
import { IUser, IUserUpdate } from '../models/UserModel';

/**
 * User service
 *
 * @export
 * @class UserService
 */
@injectable()
export class UserService {
  /**
   * Create
   *
   * @param {UserModel} { email, username, password }
   * @returns {Promise<any>}
   * @memberof UserService
   */
  async create({ email, username, password }: IUser): Promise<any> {
    return await User.create({ email, username, password });
  }

  /**
   * List
   *
   * @param {number} [page]
   * @returns {Promise<any[]>}
   * @memberof UserService
   */
  async list(page?: number): Promise<any[]> {
    return await User.find();
  }

  /**
   * Fetch
   *
   * @param {string} id
   * @returns {Promise<any>}
   * @memberof UserService
   */
  async fetch(id: string): Promise<any> {
    return await User.findById(id);
  }

  /**
   * Update
   *
   * @param {string} id
   * @param {UserUpdateModel} { email, username }
   * @returns {Promise<any>}
   * @memberof UserService
   */
  async update(id: string, { email, username }: IUserUpdate): Promise<any> {
    return await User.findByIdAndUpdate(id, { email, username, updated: Date.now() }, { new: true });
  }

  /**
   * Remove
   *
   * @param {string} id
   * @returns {Promise<any>}
   * @memberof UserService
   */
  async remove(id: string): Promise<any> {
    return await User.findByIdAndRemove(id);
  }

  async checkPassword(username: string, password: string): Promise<any> {
    const user = await User.findOne({ username });
    if (user) {
      return user.validatePassword(password);
    }
    return false;
  }
}
