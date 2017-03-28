/**
 * Koa middleware stack that handles the application API routes and authorization.
 * This module is mounted by the main server app.
 * Each main api route is handled by a dedicated 'controller'.
 */
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as parser from 'koa-bodyparser';
import * as passport from 'koa-passport';
import * as authSetup from './authSetup';
import * as utility from './controllers/utility';

const api = new Koa();
const router = new Router();

// Set up the api middleware stack including authorization.
api.use(parser());
authSetup(api, passport);

// Initialize the different controllers. 
// The controller modules exposes a single function that sets up
// the routes defined in the controller. The function requires 
// three parameters; the Router object, the "Koa-Passport" object
// and the controllers main api URL.
utility(router, passport, 'utility');

api.use(router.routes());

export = api;
