/**
 *  Utility controller routes
 * 
 */
import * as Router from "koa-router";

export = function (router: Router, baseUri: string) {
    router.post(baseUri + '/echo', async (ctx, next) => {
      console.log(ctx.request.body.text)
      ctx.body = {response: ctx.request.body.text.toUpperCase()};
    });

    router.get(baseUri + '/stuff', async (ctx, next) => {
      ctx.body = JSON.stringify(process.env);
    });
  return router;
}

// export = class UtilController {
//   constructor(private router:Router, private baseUri:string) {
//   }

//   //define all of the actual routes and actions here
//   init() {
//     this.router.post(this.baseUri + '/echo', async (ctx, next) => {
//       ctx.body = '' //get the content in the request and uppercase it;
//     });

//     this.router.get(this.baseUri + '/stuff', async (ctx, next) => {
//       ctx.body = JSON.stringify(process.env);
//     });
//   }
// }