import { autoinject } from 'aurelia-framework';
import { DataService } from './services/dataService';

@autoinject
export class ApiTest {
  public heading = 'API Testing';
  public echoText = '';
  public result1: string = '';
  public result2: string = '';
  public result3: string = '';

  constructor(private dataService: DataService) {
    this.dataService = dataService;
  }

  public apiCall1() {
    this.dataService.systemStuff().then(data => this.result1 = JSON.stringify(data.response, undefined, 2));
  }

  public apiCall2() {
    this.dataService.echo(this.echoText).then(data => this.result2 = JSON.stringify(data.response, undefined, 2));
  }

  public apiCall3() {
    this.dataService.externalStuff().then(data => this.result3 = JSON.stringify(data.response, undefined, 2));
  }
}
