/**
 *  Utility controller routes
 * 
 */
import * as Router from 'koa-router';
// import * as koaPassport from 'koa-passport'; Note: the @types/koa-passport file doesn't work

export = (router: Router, passport: any, baseUri: string) => {
  router.post(baseUri + '/echo', async (ctx, next) => {
    ctx.body = { response: ctx.request.body.text.toUpperCase() };
  });

  router.get(baseUri + '/stuff', passport.authenticate('kerberos', {noUserRedirect: '/adDown'}),
             async (ctx, next) => {
    ctx.body = {
      user: JSON.stringify(ctx.state.user),
      env: JSON.stringify(process.env)};
  });
  return router;
};
