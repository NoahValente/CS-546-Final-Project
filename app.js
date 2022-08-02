const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');

const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

app.use;
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebarsInstance.engine);
//app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

// use for testing and keeping track of routing
const myLogger = function (req, res, next) {
  const date = new Date().toUTCString();
  const method = req.method;
  const route = req.originalUrl;
  let account_type = "User";
  if (!req.session.account_type) {
    account_type = "Guest";
  } else if (req.session.usertype === "Business") {
    account_type = "Business";
  }
  console.log("[" + date + "]: " + method + " " + route + " " + account_type);
  next();
}

app.use(myLogger);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});