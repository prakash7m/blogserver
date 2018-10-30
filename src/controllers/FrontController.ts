import { controller, BaseHttpController, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { PostService } from "../services/PostService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { Request, Response } from "express-serve-static-core";
import { Utils } from "../lib/Utils";

/**
 * The front controller
 *
 * @export
 * @class FrontController
 * @extends {BaseHttpController}
 */
@controller("/api/get")
export class FrontController extends BaseHttpController {
  constructor(
    @inject('PostService') private postService: PostService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler
  ) {
    super();
  }

  @httpGet("/post/latest")
  public async getLatestPosts(req: Request, res: Response) {
    try {
      const list = await this.postService.getLatestPosts();
      await Utils.sleep();
      res.status(200).json({ rows: list });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

  @httpGet("/post/:slug")
  public async getPostBySlug(req: Request, res: Response) {
    try {
      const item = await this.postService.getPostBySlug(req.params.slug);
      await Utils.sleep();
      res.status(200).json({ data: item });
    } catch (err) {
      res.status(400).json(this.errorHandler.handle(err));
    }
  }

}
