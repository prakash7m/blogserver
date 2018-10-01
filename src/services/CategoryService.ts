import { injectable } from "inversify";

import { Category, ICategoryModel, ICategory, ICategoryUpdate } from "../models/CategoryModel";

/**
 * Category service: Basic category operations on the database
 *
 * @export
 * @class CategoryService
 */
@injectable()
export class CategoryService {
  /**
   * Creates a new category in the database
   *
   * @param {CategoryModel} { name, description }
   * @returns {Promise<ICategoryModel[]>}
   * @memberof CategoryService
   */
  async create({ name, description }: ICategory): Promise<ICategoryModel> {
    return await Category.create({ name, description });
  }

  /**
   * Retrieves the list of categories in the database
   *
   * @param {number} [page]
   * @returns {Promise<ICategoryModel[][]>}
   * @memberof CategoryService
   */
  async list(page?: number): Promise<ICategoryModel[]> {
    return await Category.find({}, {_id: true, name: true, description: true, created: true, updated: true});
  }

  /**
   * Fetches the category information by id
   *
   * @param {string} id
   * @returns {Promise<ICategoryModel | null>}
   * @memberof CategoryService
   */
  async fetch(id: string): Promise<ICategoryModel | null> {
    return await Category.findById(id);
  }

  /**
   * Updates the category on db by id
   *
   * @param {string} id
   * @param {CategoryUpdateModel} { name, description }
   * @returns {Promise<ICategoryModel | null>}
   * @memberof CategoryService
   */
  async update(id: string, { name, description }: ICategoryUpdate): Promise<ICategoryModel | null> {
    return await Category.findByIdAndUpdate(id, { name, description, updated: Date.now() }, { new: true });
  }

  /**
   * Remove category from db by id
   *
   * @param {string} id
   * @returns {(Promise<ICategoryModel | null>)}
   * @memberof CategoryService
   */
  async remove(id: string): Promise<ICategoryModel | null> {
    return await Category.findByIdAndRemove(id);
  }
  
  /**
   * Checks if the provided username or the email is already taken.
   *
   * @param {string} username
   * @param {string} email
   * @returns {Promise<boolean>}
   * @memberof CategoryService
   */
  async categoryExists(name: string): Promise<boolean> {
    return await Category.find({ name }).count() > 0;
  }
}
