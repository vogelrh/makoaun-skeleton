/* tslint:disable:no-var-requires */
/* tslint:disable:no-console */
/**
 * Utility controller routes 
 * TODO - figure out noUserRedirect and test
 * 
 */
import * as Router from 'koa-router';
import {ProxyRequest} from '../services/proxyRequest';
// import * as Passport from 'koa-passport'; // Note: the @types/koa-passport file doesn't work for importing type

let proxyHTTP = new ProxyRequest();

const utilityRouter = (router: Router, passport: any, baseUri: string) => {

  /**
   * Post: returns the text sent in the body of the request after upper casing
   */
  router.post(baseUri + '/echo', passport.authenticate('kerberos'),
    async (ctx, next) => {
      ctx.body = { response: ctx.request.body.text.toUpperCase() };
    });

  /**
   * Get: returns the user's Active directory information and also the environment information.
   * The call gets the user information from the authentication step.
   */
  router.get(baseUri + '/stuff', passport.authenticate('kerberos'),
    async (ctx, next) => {
      ctx.body = {
        response: {
          user: ctx.state.user,
          env: process.env
        }
      };
    });

  /**
   * Get: returns the user's Active directory information from a external service. It uses the
   * the kerberos double-hop (constrained delegation) to authenticate to the AD service on behalf
   * of the user.
   */
  router.get(baseUri + '/dhop', passport.authenticate('kerberos'),
    async (ctx, next) => {
      try {
        let opts = {
          hostname: 'irwebdev.intranet.dow.com',
          path: '/adservice/api/ActiveDirectory/User?searchTerm=nb88843'
        };
        let result = await proxyHTTP.userGet(ctx.state.user.principal, opts);
        ctx.body = {
          response: {
            user: result
          }
        };
      } catch (e) {
        console.error(e);
        ctx.body = 'ERROR: ' + e; // TODO - need to figure out how to handle better.
      }
    });

  return router;
};

export = utilityRouter;
