const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const businessData = data.businesses;

//TODO: ADD FAVOURITE ROUTE
router.get('/', async (req, res) => {
    if (req.session.user) {
      res.redirect('/explore');
    } else {
      res.render('main/index', {title: "Welcome"});
    }
  });
  
  router.get('/signup', async (req, res) => {
    if (!req.session.account_type) {
        res.render('main/signup', {title: "Sign Up"});
    } else {
      res.redirect('/explore');
    }
  });
  
  router.post('/signup/user', async (req, res) => {
    const {firstName, lastName, email, username, gender, city, state, age, password, preferences} = req.body;
    try {
      if ((await userData.createUser(firstName, lastName, email, username, gender, city, state, age, password, preferences)).userInserted === true) {
        res.redirect('/login');
      } else {
        res.render('main/signup', {
          title: "Sign Up",
          firstName: firstName, 
          lastName: lastName, 
          email: email, 
          username: username,
          gender: gender, 
          city: city,
          state: state,
          age: age,
          password: password,
          preferences: preferences,
          error: "Internal Server Error"
        });
        res.status(500);
      }
    } catch (e) {
      res.render('main/signup', {
        title: "Sign Up",
        firstName: firstName, 
        lastName: lastName, 
        email: email, 
        username: username,
        gender: gender, 
        city: city,
        state: state,
        age: age,
        password: password,
        preferences: preferences,
        error: e
      });
      res.status(400);
      return;
    }
  });

  router.post('/signup/business', async (req, res) => {
    const {firstName, lastName, username, email, city, state, password, businessType} = req.body;
    try {
      if ((await businessData.createBusiness(firstName, lastName, username, email, city, state, password, businessType)).userInserted === true) {
        res.redirect('/login');
      } else {
        res.render('main/signup', {
          title: "Sign Up",
          firstName: firstName, 
          lastName: lastName, 
          username: username, 
          email: email, 
          city: city,
          state: state,
          password: password,
          businessType: businessType,
          error: "Internal Server Error"
        });
        res.status(500);
      }
    } catch (e) {
      res.render('main/signup', {
        title: "Sign Up",
        firstName: firstName, 
        lastName: lastName, 
        username: username, 
        email: email, 
        city: city,
        state: state,
        password: password,
        businessType: businessType,
        error: e
      });
      res.status(400);
      return;
    }
  });

  router.get('/login', async (req, res) => {
    if (!req.session.account_type) {
        res.render('main/login', {title: "Log In"});
    } else {
      res.redirect('/explore');
    }
  });
  
  router.post('/login', async (req, res) => {
    const {username, password, account_type} = req.body;
    try {
        if(account_type === 'User'){
            //username can either be email or the username - handled in the data folder
            const check = await userData.checkUser(username, password);
            if (check.authenticated === true) {
                req.session.user = username;
                req.session.account_type = 'User';
              } else {
                throw 'Failed to log in.';
              }
              res.redirect('/explore');
        }
        else{
            req.session.account_type = 'Business';
            const check = await businessData.checkBusiness(username, password); 
            if (check.authenticated === true) {
                req.session.user = username;
                req.session.account_type = 'Business';
              } else {
                throw 'Failed to log in.';
              }
              res.redirect('/explore');
        }
      
      
    } catch (e) {
      res.render('main/login', {
        title: "Log In",
        username: username,
        password: password,
        account_type: account_type,
        error: e
      });
      res.status(400);
      return;
    }
    
  });
  
  router.get('/logout', async (req, res) => {
    res.render('main/logout', {title: "Logged Out", name: req.session.user});
    req.session.destroy();
  });

  router.get('/favorites', async (req, res) => {
    if (!req.session.account_type){
      res.redirect('/login');
    }
    if (req.session.account_type == 'Business'){
      res.redirect('/explore');
    }
    //TODO: in the user database, access the business ids stored and return the entire business data
    let business = await userData.getFavorites(req.session.user); 
    res.render('main/favorites', {title: "Favorites", business: business, username: req.session.user});
  });
  
  module.exports = router;
  