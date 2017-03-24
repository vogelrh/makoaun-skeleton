/* tslint:disable:no-var-requires */
/* tslint:disable:no-console */
/**
 * My attempt to try to understand kerberos proxy requests.
 * Ultimately this module will be used to make http and https REST requests to 
 * kerberos protected endpoints on behalf of a previously authorized user.
 */
const Kerberos = require('kerberos').Kerberos;
const kerberos = new Kerberos();
const http = require('http');
const urlParser = require('url');

let servicePrincipalName = 'HTTP'; // TODO need to supply as options to this module
// Internal http functions
function httpget(user: string, opts: any, callback: Function) {
  console.log('submitting to ' + (opts.hostname || opts.host) +
              ' with authorization header: ' + (opts.headers || {}).authorization);
  let req = http.get(opts, function (res) {
    if (res.statusCode === 401) {
      submitWithAuthorization(user, req, opts, callback);
      return;
    }
    callback(res);
  });
  return req;
}

/**
 * needs work
 * @param err 
 * @param step 
 */
function failIfError(err, step) {
  if (err) {
    console.error(`Authentication failed at operation '${step}' with error: ${err}`);
    return 1;
  }
  console.log(`Done ${step} step`);
  return 0;
}

/**
 * Resubmit request with authorization and constrained_delegation turned on.
 * We pass in a user name to initiate a S4U2Self transition.
 * 
 * @param user user principal previously authorized
 * @param oldreq 
 * @param opts 
 * @param callback 
 */
function submitWithAuthorization(user: string, oldreq: any, opts: any, callback: Function) {
  kerberos.authGSSServerInit(servicePrincipalName, true, user, (err, ctx) => {
    if (!failIfError(err, 'init')) {
      kerberos.authGSSServerStep(ctx, null, function (aerr) {
        if (!failIfError(aerr, 'step')) {
          let headers = opts.headers || {};
          headers.authorization = 'Negotiate ' + ctx.response;
          opts.headers = headers;
          let newreq = httpget(user, opts, callback);

          // tell oldReq "owner" about newReq. resubmit is an "unofficial" event
          oldreq.emit('resubmit', newreq);
        }
      });
      kerberos.authGSSServerClean(ctx, (cerr) => failIfError(cerr, 'clean'));
    }
  });
};

// TODO need to export object with all of the crud functions

/**
 * External function to perform an HTTP Get on behalf of a kerberos user.
 * @param user The user's kerberos principal.
 * @param opts An options object containing the url request information or a string.
 * This is the same object as described in the Node.js http.request method documentation.
 */
let get = function httpGet(user: string, opts: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      console.log(`Submitting request on behalf of user ${user}`);
      httpget(user, opts, (res) => resolve(res));
    } catch (err) {
      console.error(`Request error: ${err}`);
      reject(err);
    }
  });
};

export = {
  get: get
};

