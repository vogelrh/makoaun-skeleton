/* tslint:disable:no-console */
/* tslint:disable:no-var-requires */
const NegotiateStrategy = require('passport-negotiate').Strategy;
import {User} from './services/authUser';

const strategyOptions = {
  passReqToCallback: true,
  enableConstrainedDelegation: false,
  verbose: true
};

const authsetup = (app: any, passport: any) => {
  passport.serializeUser(function (user, done) {
    done(null, user.sAMAccountName);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserializing user id:', id);
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('kerberos', new NegotiateStrategy(strategyOptions, function (req, principal, done) {
    // console.log(JSON.stringify(req));
    User.findById(principal, (err, user) => done(err, user));
  }));

  app.use(passport.initialize());
  console.log('Initialized Kerberos strategy');
};

export = authsetup;
