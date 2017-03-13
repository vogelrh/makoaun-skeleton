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

const app = new Koa();

let port = config.get('server.port');

app.use(logger());
app.use(mount(config.get<string>('server.apiUriPrefix'), api));
app.use(mount(aurelia));
app.listen(port, () => console.log(`Server running on port ${port}`));
