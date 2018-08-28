import { BaseHttpController, controller, httpPost, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/UserService";
import { ErrorHandler } from "../lib/ErrorHandler";
import { LoginValidatorMiddleware } from "../validators/LoginValidator";
import { AuthService } from "../services/AuthService";

/**
 * The login controller class for authetication related functions
 *
 * @export
 * @class LoginController
 * @extends {BaseHttpController}
 */
@controller("/api")
export class LoginController extends BaseHttpController {
  /**
   *Creates an instance of LoginController.
   * @param {UserService} userService
   * @param {ErrorHandler} errorHandler
   * @memberof LoginController
   */
  constructor(
    @inject('UserService') private userService: UserService,
    @inject('ErrorHandler') private errorHandler: ErrorHandler,
    @inject('AuthService') private authService: AuthService
  ) {
    super();
  }

  /**
   * Login
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof LoginController
   */
  @httpPost("/login")
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.login(req, res);
      if (req.user) {
        res.status(200).json({ data: this.authService.getUserInfo(req), message: "Authentication success" });
      } else {
        res.status(400).json({ message: "Authentication failed" });
      }
    } catch (err) {
      res.status(400).json({ message: "Authentication failed" });
    }
  }

  /**
   * Logout
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof LoginController
   */
  @httpGet("/logout")
  public async logout(req: any, res: Response, next: NextFunction) {
    
    // req.logout();
    try {
      await this.authService.logout(req, res);
      
      res.status(200).clearCookie('connect.sid', {path: '/'}).json({ message: "Logged out successfully" });
    } catch (err) {
      res.status(400).json({ message: "Unable to logout" });
    }

    
    // try {
    //   await req.logOut();
    //   res.status(200).json({ message: "Logged out successfully" });
    // } catch (err) {
    //   res.status(400).json({ message: "Logged out failed" });
    // }
  }

  @httpGet("/isauthenticated")
  public async isauthenticated(req: Request, res: Response, next: NextFunction) {
    if (await req.isAuthenticated()) {
      res.status(200).json({ data: this.authService.getUserInfo(req) })
    } else {
      res.status(401).json({ data: false, message: "Not authenticated" })
    }
  }
}