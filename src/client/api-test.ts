import { autoinject } from 'aurelia-framework';
import { DataService } from 'services/dataService';

@autoinject
export class ApiTest {
  public heading = 'API Testing';
  public echoText = '';
  public result1: string = '';
  public result2: string = '';

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  public apiCall1() {
      this.dataService.SystemStuff().then(data => this.result1 = JSON.stringify(data));
  }

  public apiCall2() {
    this.dataService.echo(this.echoText).then(data => this.result2 = data.response);
  }
}