import { injectable } from "inversify";

import { User, IUserModel, IUser, IUserUpdate } from "../models/UserModel";

/**
 * User service: Basic user operations on the database
 *
 * @export
 * @class UserService
 */
@injectable()
export class UserService {
  /**
   * Creates a new user in the database
   *
   * @param {UserModel} { email, username, password }
   * @returns {Promise<IUserModel[]>}
   * @memberof UserService
   */
  async create({ email, username, password }: IUser): Promise<IUserModel> {
    return await User.create({ email, username, password });
  }

  /**
   * Retrieves the list of users in the database
   *
   * @param {number} [page]
   * @returns {Promise<IUserModel[][]>}
   * @memberof UserService
   */
  async list(page?: number): Promise<IUserModel[]> {
    return await User.find({}, {_id: true, username: true, email: true, created: true, updated: true});
  }

  /**
   * Fetches the user information by id
   *
   * @param {string} id
   * @returns {Promise<IUserModel | null>}
   * @memberof UserService
   */
  async fetch(id: string): Promise<IUserModel | null> {
    return await User.findById(id);
  }

  /**
   * Updates the user on db by id
   *
   * @param {string} id
   * @param {UserUpdateModel} { email, username }
   * @returns {Promise<IUserModel | null>}
   * @memberof UserService
   */
  async update(id: string, { email, username }: IUserUpdate): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(id, { email, username, updated: Date.now() }, { new: true });
  }

  /**
   * Remove user from db by id
   *
   * @param {string} id
   * @returns {(Promise<IUserModel | null>)}
   * @memberof UserService
   */
  async remove(id: string): Promise<IUserModel | null> {
    return await User.findByIdAndRemove(id);
  }

  /**
   * Checks the password validity for an existing username.
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<boolean>}
   * @memberof UserService
   */
  async checkPassword(username: string, password: string): Promise<boolean> {
    const user = await User.findOne({ username });
    if (user) {
      return user.validatePassword(password);
    }
    return false;
  }

  /**
   * Checks if the provided username or the email is already taken.
   *
   * @param {string} username
   * @param {string} email
   * @returns {Promise<boolean>}
   * @memberof UserService
   */
  async userOrEmailExists(username: string, email: string): Promise<boolean> {
    return await User.find().or([{ username }, { email }]).count() > 0;
  }
}
