// this value comes from a global variable in index.cshtml mvc, but to avoid using globals in reassigned here
//TODO: is this really what we want to do to get user name? we should probably ask the server for the user
//we also shouldn't need to pass the current user's name to the server. it should already know who the user is
//export var userId = $("#userId").html().replace(/ /g, '').slice(5, 12);
//export var userId: string = ''; //hard coding my user id here since this app has no auth

// your app name
export var appName = "Portal";

export var ApplicationSuggestionsDiscussionUri = "ApplicationSuggestionsU4092512016-12-13";

export var ActiveDirectoryQueryUrl = "https://irwebdev.intranet.dow.com/adservice/api/ActiveDirectory/User?searchTerm=";

//#region Ajax Settings
export var ajaxSettings: any = {};
ajaxSettings.jsonType = "json";
ajaxSettings.xhrFields = { withCredentials: false };
ajaxSettings.baseURL = '';//'http://localhost:3030/';
//#endregion

//displaying all debug logs if true or only logs errors if false
export var showDebugLogs = true;
