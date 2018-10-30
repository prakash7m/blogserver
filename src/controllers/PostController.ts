import { controller, BaseHttpController, httpPost, httpGet, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";

import { PostService } from "../services/PostService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { PostValidationMiddleware } from "../validators/PostValidator";
import { authRequired } from "../config/passport";
import { Utils } from "../lib/Utils";

/**
 * The post controller
 *
 * @export
 * @class PostController
 * @extends {BaseHttpController}
 */
@controller("/api/post", authRequired())
export class PostController extends BaseHttpController {
  /**
   * Creates an instance of PostController.
   * @param {PostService} postService
   * @param {ErrorHandler} errorHandler
   * @memberof PostController
   */
  constructor(
    @inject('PostService') private postService: PostService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler
  ) {
    super();
  }

  /**
   * List
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof PostController
   */
  @httpGet("/", ...PostValidationMiddleware.list())
  public async list(req: Request, res: Response) {
    try {
      const list = await this.postService.list(req.query.page);
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
   * @memberof PostController
   */
  @httpGet("/:id", ...PostValidationMiddleware.fetch())
  public async fetch(req: Request, res: Response) {
    try {
      console.log(req.params.id)
      const item = await this.postService.fetch(req.params.id);
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
   * @memberof PostController
   */
  @httpPost("/", ...PostValidationMiddleware.create())
  public async create(req: Request, res: Response) {
    try {
      const post = await this.postService.create(req.body);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(post) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Update
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof PostController
   */
  @httpPut("/:id", ...PostValidationMiddleware.update())
  public async update(req: Request, res: Response) {
    try {
      const post = await this.postService.update(req.params.id, req.body);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(post) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  /**
   * Remove
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof PostController
   */
  @httpDelete("/:id", ...PostValidationMiddleware.remove())
  public async remove(req: Request, res: Response) {
    try {
      const post = await this.postService.remove(req.params.id);
      await Utils.sleep();
      res.status(200).json({ data: this.filter(post) });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  private filter(post) {    
    return post;
  }
}
