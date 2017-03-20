
const NegotiateStrategy = require('passport-negotiate').Strategy;
const authUser = require('./services/authUser')

//const userService = new UserService();

const strategyOptions = {
    passReqToCallback: true,
    enableConstrainedDelegation: false,
    verbose: true
};

export = (app, passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log('deserializing user id:', id);
        try {
            let user = await authUser.findById(id);
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    });

    passport.use('kerberos', new NegotiateStrategy(strategyOptions, function (req, principal, done) {
                      console.log(req.delegatedCredentialsCache);
        authUser.findById(principal).then(user => done(null, user)).catch(err => done(err));
    }));

    app.use(passport.initialize());
    console.log("Initialized Kerberos strategy");
};
