import { controller, BaseHttpController, httpPost, httpGet, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";

import { GalleryService } from "../services/GalleryService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { GalleryValidationMiddleware } from "../validators/GalleryValidator";
import { authRequired } from "../config/passport";

/**
 * The gallery controller
 *
 * @export
 * @class GalleryController
 * @extends {BaseHttpController}
 */
@controller("/api/gallery", authRequired())
export class GalleryController extends BaseHttpController {
  /**
   * Creates an instance of GalleryController.
   * @param {GalleryService} galleryService
   * @param {ErrorHandler} errorHandler
   * @memberof GalleryController
   */
  constructor(
    @inject('GalleryService') private galleryService: GalleryService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler
  ) {
    super();
  }

  /**
   * List
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof GalleryController
   */
  @httpGet("/", ...GalleryValidationMiddleware.list())
  public async list(req: Request, res: Response) {
    try {
      const list = await this.galleryService.list(req.query.page);
      await this.sleep(2000);
      res.status(200).json({ rows: list });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  async sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  /**
   * Fetch
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof GalleryController
   */
  @httpGet("/:id", ...GalleryValidationMiddleware.fetch())
  public async fetch(req: Request, res: Response) {
    try {
      const item = await this.galleryService.fetch(req.params.id);
      await this.sleep(2000);
      res.status(200).json({ data: this.filter(item) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Create
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof GalleryController
   */
  @httpPost("/", ...GalleryValidationMiddleware.create())
  public async create(req: Request, res: Response) {
    try {
      const gallery = await this.galleryService.create(req);
      await this.sleep(2000);
      res.status(200).json({ data: this.filter(gallery) });
    } catch (err) {
      console.log(err);
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Update
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof GalleryController
   */
  @httpPut("/:id", ...GalleryValidationMiddleware.update())
  public async update(req: Request, res: Response) {
    try {
      const gallery = await this.galleryService.update(req.params.id, req.body);
      await this.sleep(2000);
      res.status(200).json({ data: this.filter(gallery) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Remove
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof GalleryController
   */
  @httpDelete("/:id", ...GalleryValidationMiddleware.remove())
  public async remove(req: Request, res: Response) {
    try {
      const gallery = await this.galleryService.remove(req.params.id);
      await this.sleep(2000);
      res.status(200).json({ data: this.filter(gallery) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  private filter(gallery) {    
    return gallery;
  }
}
