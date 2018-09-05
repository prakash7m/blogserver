import { injectable } from "inversify";

import { Gallery, IGalleryModel } from "../models/GalleryModel";
import { Request } from "express";
import { resolve } from "dns";

/**
 * Gallery service: Basic gallery operations on the database
 *
 * @export
 * @class GalleryService
 */
@injectable()
export class GalleryService {
  /**
   * Creates a new gallery in the database
   *
   * @param {GalleryModel} { email, galleryname, password }
   * @returns {Promise<IGalleryModel[]>}
   * @memberof GalleryService
   */
  async create(req: any): Promise<IGalleryModel> {    
    let result;
    console.log(typeof(req.files.file))
    if (req.files.file instanceof Array) {
      console.log('hi')
      for (let file of req.files.file) {
        console.log(file);
        result = await file.mv('src/media/' + file.name);
      }
    } else {
      const file = req.files.file;
      result = await file.mv('src/media/' + file.name);
    }

    return result; 
    
    // return await Gallery.create({ name, filename, path, thumbnail });
  }

  /**
   * Retrieves the list of gallerys in the database
   *
   * @param {number} [page]
   * @returns {Promise<IGalleryModel[][]>}
   * @memberof GalleryService
   */
  async list(page?: number): Promise<IGalleryModel[]> {
    return await Gallery.find({});
  }

  /**
   * Fetches the gallery information by id
   *
   * @param {string} id
   * @returns {Promise<IGalleryModel | null>}
   * @memberof GalleryService
   */
  async fetch(id: string): Promise<IGalleryModel | null> {
    return await Gallery.findById(id);
  }

  /**
   * Updates the gallery on db by id
   *
   * @param {string} id
   * @param {GalleryUpdateModel} { email, galleryname }
   * @returns {Promise<IGalleryModel | null>}
   * @memberof GalleryService
   */
  async update(id: string, { name, tags }: IGalleryModel): Promise<IGalleryModel | null> {
    return await Gallery.findByIdAndUpdate(id, { name, tags, updated: Date.now() }, { new: true });
  }

  /**
   * Remove gallery from db by id
   *
   * @param {string} id
   * @returns {(Promise<IGalleryModel | null>)}
   * @memberof GalleryService
   */
  async remove(id: string): Promise<IGalleryModel | null> {
    return await Gallery.findByIdAndRemove(id);
  }  

  /**
   * Checks if the provided galleryname or the email is already taken.
   *
   * @param {string} galleryname
   * @param {string} email
   * @returns {Promise<boolean>}
   * @memberof GalleryService
   */
  async filenameExists(filename: string): Promise<boolean> {
    return await Gallery.find({filename}).count() > 0;
  }
}
