import * as config from './../config';
import { autoinject } from 'aurelia-framework';

@autoinject
export class DataService {

  echo(messageToEcho: string) {
    return this.PostRequest('api/v1/utility/echo', {text: messageToEcho});
  }

  SystemStuff () {
    return this.GetRequest('api/v1/utility/stuff');
  }


  //#region Helper Methods

    GetRequest(url) {
        return $.ajax({
            url: config.ajaxSettings.baseURL + url,
            type: 'GET',
            xhrFields: config.ajaxSettings.xhrFields,
            dataType: config.ajaxSettings.jsonType
        });
    }

    PutRequest(url, payload) {
        return $.ajax({
            url: config.ajaxSettings.baseURL + url,
            data: JSON.stringify(payload),
            contentType: 'application/json',
            type: 'PUT',
            xhrFields: config.ajaxSettings.xhrFields,
            dataType: config.ajaxSettings.jsonType
        })
    }

    PostRequest(url, payload) {
        return $.ajax({
            url: config.ajaxSettings.baseURL + url,
            data: JSON.stringify(payload),
            contentType: 'application/json',
            type: 'POST',
            xhrFields: config.ajaxSettings.xhrFields,
            dataType: config.ajaxSettings.jsonType
        })
    }

    DeleteRequest(url) {
        return $.ajax({
            dataType: config.ajaxSettings.jsonType,
            url: config.ajaxSettings.baseURL + url,
            type: 'DELETE',
            xhrFields: config.ajaxSettings.xhrFields,
        })
    }

    DeleteRequestWithPayload(url, payload) {
        return $.ajax({
            dataType: config.ajaxSettings.jsonType,
            url: config.ajaxSettings.baseURL + url,
            data: JSON.stringify(payload),
            contentType: 'application/json',
            type: 'DELETE',
            xhrFields: config.ajaxSettings.xhrFields,
        })
    }

}