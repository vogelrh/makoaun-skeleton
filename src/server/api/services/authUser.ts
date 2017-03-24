/* tslint:disable:no-var-requires */
/**
 * Service that retrieves User information from LDAP.
 * 
 */
const ActiveDirectory = require('activedirectory');

/**
 * Looks up the username in active directory
 * @param principal - the user's principal returned from the kerberos exchange.
 * @param callback - optional callback function. If it is supplied then the
 * function is used in the classic callback fashion. If no callback is 
 * specified then the function returns a promise.
 */
const findById = (principal: string, callback?: Function) => {
  let ad = new ActiveDirectory({
    url: process.env.AD_URL,
    baseDN: 'ou=Dow Users, dc=dow, dc=com',
    username: process.env.AD_USER,
    password: process.env.AD_PASS
  });
  let sAMAccountName = principal ? principal.split('@')[0] : '';

  if (callback) {
    ad.findUser(sAMAccountName, (err, user) => {
      if (user) {
        // add id field to user based on sAMAccountName
        user.id = user.sAMAccountName;
        user.principal = principal; // required for constrained delegation
      }
      callback(err, user);
      return;
    });
  } else {
    return new Promise((resolve, reject) => {
      try {
        ad.findUser(sAMAccountName, (err, user) => {
          if (err) {
            reject(err);
          } else {
            if (user) {
              // add id field to user based on sAMAccountName
              user.id = user.sAMAccountName;
              user.principal = principal; // required for constrained delegation
              resolve(user);
            } else {
              reject(`User ${sAMAccountName} not found.`);
            }
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
};

export = {
  findById: findById
};
