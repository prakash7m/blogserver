import helmet from "helmet";
import bodyParser from "body-parser";
import session from 'express-session';
import cors from "cors";

import { sessionSecret, corsEnableFor } from './config';
import { passportInit } from './passport';

/**
 * Configure the express app with various middlewares
 *
 * @param {*} app
 */
export const appConfig = function (app: any) {
  /**
   * Enable the cors access to the defined frontend
   */
  var corsOptions = {
    origin: corsEnableFor,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
  /**
   * Use helmet to have basic security
   * More details at https://github.com/helmetjs/helmet
   */
  app.use(helmet());

  /**
   * Use body parser to parse the request body
   * We are using json parser
   * More details at https://github.com/expressjs/body-parser
   */
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  /**
   * This is used for the session mgmt in express.
   * The default store used for session is Memory Store. Which is not recommended for prod.
   * Please see more detail at https://github.com/expressjs/session for other available stores for prod.
   */
  const sess = {
    secret: sessionSecret,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
  };
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
  }
  app.use(session(sess));

  /**
   * Initialize the passport authentication middlewares
   */
  passportInit(app);
}