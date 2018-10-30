import { controller, BaseHttpController, httpPost, httpGet, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";

import { CategoryService } from "../services/CategoryService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { CategoryValidationMiddleware } from "../validators/CategoryValidator";
import { authRequired } from "../config/passport";
import { Utils } from "../lib/Utils";

/**
 * The category controller
 *
 * @export
 * @class CategoryController
 * @extends {BaseHttpController}
 */
@controller("/api/category", authRequired())
export class CategoryController extends BaseHttpController {
  /**
   * Creates an instance of CategoryController.
   * @param {CategoryService} categoryService
   * @param {ErrorHandler} errorHandler
   * @memberof CategoryController
   */
  constructor(
    @inject('CategoryService') private categoryService: CategoryService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler
  ) {
    super();
  }

  /**
   * List
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof CategoryController
   */
  @httpGet("/", ...CategoryValidationMiddleware.list())
  public async list(req: Request, res: Response) {
    try {
      const list = await this.categoryService.list(req.query.page);
      await Utils.sleep();
      res.status(200).json({ rows: list });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Fetch
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof CategoryController
   */
  @httpGet("/:id", ...CategoryValidationMiddleware.fetch())
  public async fetch(req: Request, res: Response) {
    try {
      const item = await this.categoryService.fetch(req.params.id);
      await Utils.sleep();
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
   * @memberof CategoryController
   */
  @httpPost("/", ...CategoryValidationMiddleware.create())
  public async create(req: Request, res: Response) {
    try {
      const category = await this.categoryService.create(req.body);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(category) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Update
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof CategoryController
   */
  @httpPut("/:id", ...CategoryValidationMiddleware.update())
  public async update(req: Request, res: Response) {
    try {
      const category = await this.categoryService.update(req.params.id, req.body);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(category) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Remove
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof CategoryController
   */
  @httpDelete("/:id", ...CategoryValidationMiddleware.remove())
  public async remove(req: Request, res: Response) {
    try {
      const category = await this.categoryService.remove(req.params.id);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(category) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  private filter(category) {
    const { _id, name, description, created, updated } = category;
    return { _id, name, description, created, updated };
  }
}
