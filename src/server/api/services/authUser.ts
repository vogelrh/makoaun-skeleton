/**
 * Controller that retrieves User information from LDAP or from MarkLogic
 * TODO - figure out how to deal with export a class.
 */
const proxy = require('./proxyRequest');


const findById = (id: string) => {
  return new Promise((resolve, reject) => {
    let result = {
      userName: 'BobbyV',
      principal: id,
      id: 'NB88843'
    };
    console.log("Principal: " + id);
    const options = {
      hostname: 'irwebdev.intranet.dow.com'
      , path: '/adservice/api/ActiveDirectory/User?searchTerm=nb88843'
    };
    // proxy(id, options).then((res) => {
    //   console.log(JSON.stringify(res));
    //   resolve(result);
    // }).catch((err) => reject(err));
    resolve(result);
  });
};

const test = () => console.log("teest");

export = {
  findById: findById,
  test: test
};

