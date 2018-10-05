import { injectable } from "inversify";

import { Post, IPostModel } from "../models/PostModel";

/**
 * Post service: Basic post operations on the database
 *
 * @export
 * @class PostService
 */
@injectable()
export class PostService {
  /**
   * Creates a new post in the database
   *
   * @param {PostModel} { email, postname, password }
   * @returns {Promise<IPostModel[]>}
   * @memberof PostService
   */
  async create(model: IPostModel): Promise<IPostModel> {
    let { title, synopsis, slug, hero, content, category, active, meta, readtime } = model;
    return await Post.create({
      title, synopsis, slug, hero, content, category, active, meta, readtime
    });
  }

  /**
   * Retrieves the list of posts in the database
   *
   * @param {number} [page]
   * @returns {Promise<IPostModel[][]>}
   * @memberof PostService
   */
  async list(page?: number): Promise<IPostModel[]> {
    return await Post.find({}, {_id: true, title: true, synopsis: true, slug: true, content: true, hero: true,
      category: true, active: true, meta: true, readtime: true, created: true, updated: true});
  }

  /**
   * Fetches the post information by id
   *
   * @param {string} id
   * @returns {Promise<IPostModel | null>}
   * @memberof PostService
   */
  async fetch(id: string): Promise<IPostModel | null> {
    return await Post.findById(id);
  }

  /**
   * Updates the post on db by id
   *
   * @param {string} id
   * @param {PostUpdateModel} { email, postname }
   * @returns {Promise<IPostModel | null>}
   * @memberof PostService
   */
  async update(id: string, model: IPostModel): Promise<IPostModel | null> {
    let { title, synopsis, slug, hero, category, content, active, meta, readtime } = model;
    return await Post.findByIdAndUpdate(id, {
      title, synopsis, slug, hero, category, content, active, meta, readtime, updated: Date.now() }, { new: true });
  }

  /**
   * Remove post from db by id
   *
   * @param {string} id
   * @returns {(Promise<IPostModel | null>)}
   * @memberof PostService
   */
  async remove(id: string): Promise<IPostModel | null> {
    return await Post.findByIdAndRemove(id);
  }

  /**
   * Checks if the provided post is already taken.
   *
   * @param {string} postname
   * @param {string} email
   * @returns {Promise<boolean>}
   * @memberof PostService
   */
  async postExists(slug: string): Promise<boolean> {
    return await Post.find({slug: slug}).count() > 0;
  }
}
