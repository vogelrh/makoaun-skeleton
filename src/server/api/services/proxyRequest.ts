/**
 * My attempt to try to understand kerberos proxy requests.
 * Ultimately this module will be used to make http and https REST requests to 
 * kerberos protected endpoints on behalf of a previously authorized user.
 */
const Kerberos = require('kerberos').Kerberos;
const kerberos = new Kerberos();
const http = require('http');
const urlParser = require('url');

// Internal http functions
function httpget(user: string, opts: any, callback: Function) {
  console.log('submitting to ' + (opts.hostname || opts.host) + ' with authorization header: ' + (opts.headers || {}).authorization);
  let req = http.get(opts, function (res) {
    if (res.statusCode == 401) {
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
  kerberos.authGSSServerInit(null, true, user, (err, ctx) => {
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

// need to export object with all of the crud functions
// Wrap http functions in promises
export = function httpGet(user: string, opts: any) {
  return new Promise((resolve, reject) => {
    try {
      httpget(user, opts, (res) => resolve(res));
    } catch (err) {
      reject(err);
    }    
  });
};
