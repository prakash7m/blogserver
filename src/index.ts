import "reflect-metadata";
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import mongoose from 'mongoose';

import "./controllers/UserController";
import "./controllers/LoginController";
import "./controllers/GalleryController";
import "./controllers/CategoryController";
import "./controllers/PostController";
import "./controllers/SubscriberController";

import "./controllers/FrontController";

import { UserService } from './services/UserService';
import { ErrorHandler } from './lib/ErrorHandler';
import { ValidationErrorHandler } from './lib/ValidationErrorHandler';
import { appConfig } from './config/AppConfig';
import { mongoDBURL } from "./config/config";
import { AuthService } from "./services/AuthService";
import { GalleryService } from "./services/GalleryService";
import { CategoryService } from "./services/CategoryService";
import { PostService } from "./services/PostService";
import { SubscriberService } from "./services/SubscriberService";

/**
 * Connect to mongo db.
 */
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to db.'))
  .on('error', (error) => {
    console.warn('Failed to connect to db: ', error);
  });

// set up container
let container = new Container();

// set up bindings
container.bind<UserService>('UserService').to(UserService);
container.bind<ErrorHandler>('ErrorHandler').to(ErrorHandler);
container.bind<ValidationErrorHandler>('ValidationErrorHandler').to(ValidationErrorHandler);
container.bind<AuthService>('AuthService').to(AuthService);
container.bind<GalleryService>('GalleryService').to(GalleryService);
container.bind<CategoryService>('CategoryService').to(CategoryService);
container.bind<PostService>('PostService').to(PostService);
container.bind<SubscriberService>('SubscriberService').to(SubscriberService);


/**
 * Create inversify express server
 */
let server = new InversifyExpressServer(container);
server.setConfig(appConfig);

let app = server.build();
app.listen(3000);