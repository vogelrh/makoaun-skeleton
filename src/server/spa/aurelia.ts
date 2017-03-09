/**
 * Koa 'app' that handles serving of the Aurilea client files.
 * This module is mounted at '/' in the main server app.
 * This module will explicitly serve an Aurilea application. It generates
 * its own starting html code (equivalent to index.html).
 */
import * as Koa from "koa";
import * as StaticFiles from "koa-static";
import * as config from "config";

const aurelia = new Koa();

const INDEX_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Aurelia</title>
    <link rel="stylesheet" href="jspm_packages/npm/font-awesome@4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="styles/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body aurelia-app="main">
    <div class="splash">
      <div class="message">Aurelia Navigation Skeleton</div>
      <i class="fa fa-spinner fa-spin"></i>
    </div>
    <script src="jspm_packages/system.js"></script>
    <script src="config.js"></script>
    <script src="jspm_packages/npm/bluebird@3.4.1/js/browser/bluebird.min.js"></script>
    <script>
      System.import('aurelia-bootstrapper');
    </script>
  </body>
</html>`;
// Server all static Aurelia files except index.html. This is generated.
// Note: this line must be before the function that dynamically serves the index.html 
aurelia.use(StaticFiles('.'));

// Serve the index.html page from the INDEX_HTML string as opposed to an actual file.
aurelia.use(async (ctx, next) => {
  if (ctx.url === '/' || ctx.url === '/index.html') {
    ctx.body = INDEX_HTML;
    console.log(__dirname);
  }
});


export = aurelia