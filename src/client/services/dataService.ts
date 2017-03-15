import * as config from './../app-config';
import { autoinject } from 'aurelia-framework';
import * as $ from 'jquery';

@autoinject
export class DataService {

  public echo(messageToEcho: string) {
    return this.PostRequest('api/v1/utility/echo', {text: messageToEcho});
  }

  public SystemStuff () {
    return this.GetRequest('api/v1/utility/stuff');
  }

  //#region Helper Methods

  private  GetRequest(url) {
        return $.ajax({
            url: config.ajaxSettings.baseURL + url,
            type: 'GET',
            xhrFields: config.ajaxSettings.xhrFields,
            dataType: config.ajaxSettings.jsonType
        });
    }

 private  PutRequest(url, payload) {
        return $.ajax({
            url: config.ajaxSettings.baseURL + url,
            data: JSON.stringify(payload),
            contentType: 'application/json',
            type: 'PUT',
            xhrFields: config.ajaxSettings.xhrFields,
            dataType: config.ajaxSettings.jsonType
        });
    }

private   PostRequest(url, payload) {
        return $.ajax({
            url: config.ajaxSettings.baseURL + url,
            data: JSON.stringify(payload),
            contentType: 'application/json',
            type: 'POST',
            xhrFields: config.ajaxSettings.xhrFields,
            dataType: config.ajaxSettings.jsonType
        });
    }

 private   DeleteRequest(url) {
        return $.ajax({
            dataType: config.ajaxSettings.jsonType,
            url: config.ajaxSettings.baseURL + url,
            type: 'DELETE',
            xhrFields: config.ajaxSettings.xhrFields
        });
    }

 private   DeleteRequestWithPayload(url, payload) {
        return $.ajax({
            dataType: config.ajaxSettings.jsonType,
            url: config.ajaxSettings.baseURL + url,
            data: JSON.stringify(payload),
            contentType: 'application/json',
            type: 'DELETE',
            xhrFields: config.ajaxSettings.xhrFields
        });
    }
}
