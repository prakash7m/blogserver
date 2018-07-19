import { Request, Response } from "express";
import passport from "passport";
import { injectable } from "inversify";

/**
 * Authentication service to perform login and logout etc
 *
 * @export
 * @class AuthService
 */
@injectable()
export class AuthService {
  /**
   * Passport local login using username and password.
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<any>}
   * @memberof AuthService
   */
  async login(req: Request, res: Response): Promise<any> {
    return new Promise((resolve, reject) => {
      passport.authenticate('local-login', (err, user, info) => {
        if (err) return reject(err);
        if (!user) {
          return reject();
        }
        req.logIn(user, function (loginErr) {
          if (loginErr) reject(loginErr);
          return resolve();
        });
      })(req, res);
    });
  }
}
