const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = require('../data/users')
const businessData = require('../data/business');

//TODO: ADD FAVOURITE ROUTE
router.get('/', async (req, res) => {
    if (req.session.user) {
      res.redirect('/explore');
    } else {
      res.render('main/index', {title: "Welcome", hasError: false});
    }
  });
  
  router.get('/signup', async (req, res) => {
    if (!req.session.account_type) {
        res.render('main/signup', {title: "Sign Up", hasError: false});
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
        console.log(preferences); 
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
          hasError: true,
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
        hasError: true,
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
          hasError: true,
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
        hasError: true,
        error: e
      });
      res.status(400);
      return;
    }
  });

  router.get('/login', async (req, res) => {
    if (!req.session.account_type) {
        res.render('main/login', {title: "Log In", hasError: false});
    } else {
      res.redirect('/explore');
    }
  });
  
  router.post('/login', async (req, res) => {
    const {username, password, userType} = req.body;
    
    try {
        if(userType === 'User'){
            //username can either be email or the username - handled in the data folder
            const check = await userData.checkUser(username, password);
            if (check.authenticated === true) {
                req.session.user = username;
                req.session.account_type = 'User';
              } 
              res.redirect('/explore');
        }
        else if (userType === 'Business'){
            req.session.account_type = 'Business';
            const check = await businessData.checkBusiness(username, password); 
            if (check.authenticated === true) {
                req.session.user = username;
                req.session.account_type = 'Business';
              } 
              res.redirect('/explore');
        }
        else {
          throw 'Need to select account type.';
        }
      
    } catch (e) {
      res.render('main/login', {
        title: "Log In",
        username: username,
        password: password,
        account_type: req.session.account_type,
        hasError: true, 
        error: e
      });
      res.status(400);
      return;
    }
    
  });
  
  router.get('/logout', async (req, res) => {
    res.render('main/logout', {title: "Logged Out", name: req.session.user, hasError: false});
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
    res.render('main/favorites', {title: "Favorites", business: business, username: req.session.user, hasError: false});
  });
  
  module.exports = router;
  