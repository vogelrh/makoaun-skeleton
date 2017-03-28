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
  public userPrincipalName: string;
  public sAMAccountName: string;
  public mail: string;
  public sn: string;
  public givenName: string;
  public displayName: string;
  public principal: string;

  constructor(adObj: any, principal: string) {
    if (adObj) {
      this.id = adObj.sAMAccountName;
      this.dn = adObj.dn;
      this.userPrincipalName = adObj.userPrincipalName;
      this.sAMAccountName = adObj.sAMAccountName;
      this.mail = adObj.mail;
      this.sn = adObj.sn;
      this.givenName = adObj.givenName;
      this.displayName = adObj.displayName;
      this.principal = principal;
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

    let sAMAccountName = principal ? principal.split('@')[0] : '';

    if (callback) {
      ad.findUser(sAMAccountName, (err, aduser) => {
        if (aduser) {
          let user = new UserInstance(aduser, principal);
          callback(err, user);
        } else {
          callback(`User ${sAMAccountName} not found.`, null);
        }
        return;
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          ad.findUser(sAMAccountName, (err, aduser) => {
            if (err) {
              reject(err);
            } else {
              if (aduser) {
                let user = new UserInstance(aduser, principal);
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
}
