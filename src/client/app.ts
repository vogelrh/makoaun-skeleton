import {Router, RouterConfiguration} from 'aurelia-router';
import {appName} from './app-config';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = appName;
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Exernal REST API' },
      { route: 'api-test',  name: 'api-test', moduleId: 'api-test', nav: true, title: 'App API' }
    ]);

    this.router = router;
  }
}
