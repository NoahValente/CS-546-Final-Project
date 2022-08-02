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
    const {firstName, lastName, email, userName, gender, city, state, age, hasedPassword, preferences} = req.body;
    try {
      if ((await userData.createUser(username, password)).userInserted === true) {
        res.redirect('/');
      } else {
        res.render('users/signup', {
          title: "Sign Up",
          username: username,
          password: password,
          error: "Internal Server Error"
        });
        res.status(500);
      }
    } catch (e) {
      res.render('users/signup', {
        title: "Sign Up",
        username: username,
        password: password,
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
  