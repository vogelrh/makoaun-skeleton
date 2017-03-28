/* tslint:disable:no-var-requires */
/* tslint:disable:no-console */
/**
 *  Web Server that serves an Aurelia SPA and serves the REST API
 *  for the SPA application
 */
import * as config from 'config';
import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as logger from 'koa-logger';
import * as aurelia from './spa/aurelia';
import * as api from './api/router';
require('dotenv').config();

const app = new Koa();

let port = config.get('server.port');

// Add common middleware at top of stack
app.use(logger());

// Now mount the two middleware stacks, one that servers the 
// static assets and one that handles the API routes.
app.use(mount(config.get<string>('server.apiUriPrefix'), api));
app.use(mount(aurelia));

app.listen(port, () => console.log(`Server running on port ${port}`));
