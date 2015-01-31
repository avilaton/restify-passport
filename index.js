var restify = require('restify');
var app = restify.createServer();
var morgan = require('morgan');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    findByUsername(username, function(err, user) {
     if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(new restify.NotAuthorizedError("Invalid password.")); }
        return done(null, user);
    });
  }
));


app.use(restify.bodyParser());
app.use(restify.queryParser());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

var mongoose = require('mongoose/');
var config = require('./config');
db = mongoose.connect(config.creds.mongoose_auth_local);

var schoolCtrl = require('./controllers/school');
app.get('/schools', isLoggedIn, schoolCtrl.get);
app.post('/schools', schoolCtrl.set);


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


//Define users
var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];


function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

app.post('/login', function(req, res, next) {
 passport.authenticate('local', function(err, user, info) {
   if (err) { return next(err); }
   if (!user) { return next(new restify.NotAuthorizedError("User not found ")) }
    resMessage = {};
    resMessage.status="success";
    resMessage.user = user;

   res.send(resMessage);
   return next();

 })(req, res, next);
});

app.use(restify.conditionalRequest());

app.use(function(req, res, next) {
  res.redirect = function(addr) {
    res.header('Location', addr);
    res.send(302);
  }
  done();
});

app.listen(8080, function() {
  console.log(app.name, app.url);
});