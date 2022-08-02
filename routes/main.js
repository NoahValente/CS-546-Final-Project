const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const businessData = data.businesses;

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
    const {firstName, lastName, businessName, email, city, state, password, businessType} = req.body;
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


  
  router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
      const check = await userData.checkUser(username, password);
      if (check.authenticated === true) {
        req.session.user = username;
      } else {
        throw 'Failed to log in.';
      }
      res.redirect('/private');
    } catch (e) {
      res.render('users/login', {
        title: "Log In",
        username: username,
        password: password,
        error: e
      });
      res.status(400);
      return;
    }
    
  });
  
  router.get('/logout', async (req, res) => {
    res.render('users/other', {title: "Logged Out", message: 'You have been logged out.'});
    req.session.destroy();
  });
  
  module.exports = router;
  