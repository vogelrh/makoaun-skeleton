/**
 * Module containing a number of application configuration settings
 */

// your app name
export const appName = 'MAKOAUN Skeleton';

export const ApplicationSuggestionsDiscussionUri = 'ApplicationSuggestionsU4092512016-12-13';

export const ActiveDirectoryQueryUrl = 'https://irwebdev.intranet.dow.com/adservice/api/ActiveDirectory/User?searchTerm=';

//#region Ajax Settings
export const ajaxSettings: any = {};
ajaxSettings.jsonType = 'json';
ajaxSettings.xhrFields = { withCredentials: false };
ajaxSettings.baseURL = '';// 'http://localhost:3030/';
//#endregion

// displaying all debug logs if true or only logs errors if false
export const showDebugLogs = true;
