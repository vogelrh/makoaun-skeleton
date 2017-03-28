/* tslint:disable:no-var-requires */
/**
 * Module exorts a class with a static method that retrieves User 
 * information from LDAP. It returns an object that contains properties 
 * that are a subset of the properties returned by the ldap 'findUser' call.
 * 
 * This class mimics the Passport User model pattern typically found in Passport
 * authorization code to validate the user information.
 */
const ActiveDirectory = require('activedirectory');

/**
 * Class that contains a subset of the activedirectory information.
 */
 class UserInstance {
  /**
   * Public properties
   */
  public id: string;
  public dn: string;
  public sAMAccountName: string;
  public mail: string;
  public sn: string;
  public givenName: string;
  public displayName: string;
  public principal: string;

  constructor(adObj: any) {
    if (adObj) {
      this.id = adObj.sAMAccountName;
      this.dn = adObj.dn;
      this.principal = adObj.userPrincipalName;
      this.sAMAccountName = adObj.sAMAccountName;
      this.mail = adObj.mail;
      this.sn = adObj.sn;
      this.givenName = adObj.givenName;
      this.displayName = adObj.displayName;
    }
  }
};

export class User {
  /**
   * The function exposed by this module that will find the user in ActiveDirectory
   * that has the sAMAccountName equal to the first part of the principal.
   * 
   * @param principal - the user principal returned from kerberos authentication.
   * @param callback - ooptional callback function. If it is supplied then the
   * function is used in the classic callback fashion. If no callback is 
   * specified then the function returns a Promise.
   */
  public static findById(principal: string, callback?: Function) {
    let ad = new ActiveDirectory({
      url: process.env.AD_URL,
      baseDN: 'ou=Dow Users, dc=dow, dc=com',
      username: process.env.AD_USER,
      password: process.env.AD_PASS
    });

    if (callback) {
      ad.findUser(principal, (err, aduser) => {
        if (aduser) {
          let user = new UserInstance(aduser);
          callback(err, user);
        } else {
          callback(`User ${principal} not found.`, null);
        }
        return;
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          ad.findUser(principal, (err, aduser) => {
            if (err) {
              reject(err);
            } else {
              if (aduser) {
                let user = new UserInstance(aduser);
                resolve(user);
              } else {
                reject(`User ${principal} not found.`);
              }
            }
          });
        } catch (e) {
          reject(e);
        }
      });
    }
  };
}
