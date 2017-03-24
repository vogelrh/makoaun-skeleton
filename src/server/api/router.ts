/* tslint:disable:no-var-requires */
/**
 * Koa app that handles the application API routes and authorization.
 * This module is mounted by the main server app.
 * Each main api route is handled by a dedicated 'controller'.
 */
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as parser from 'koa-bodyparser';
import * as passport from 'koa-passport';
const authSetup = require('./authSetup');
const utility = require('./controllers/utility');

const api = new Koa();
const router = new Router();
api.use(parser());
authSetup(api, passport);
// Initialize the different controllers. The controller modules have an init method
// that takes a router and a url component.
utility(router, passport, 'utility');

api.use(router.routes());

export = api;
