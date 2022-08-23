const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const userData = data.users;
const businessData = data.business;
const validation = data.validation;

router.get('/', async (req, res) => {
    res.render('main/index', {title: "Welcome", hasError: false, hasMessage:false});
  });
  
  router.get('/signup', async (req, res) => {
    if (!req.session.account_type) {
      res.render('main/signup', {title: "Sign Up", hasError: false, hasMessage:false});
    } else {
      res.redirect('/explore');
    }
  });
  
  router.post('/signup/user', async (req, res) => {
    const firstName = xss(req.body.firstName);
    const lastName = xss(req.body.lastName);
    const email = xss(req.body.email);
    const username = xss(req.body.username);
    const gender = xss(req.body.gender);
    const city = xss(req.body.city);
    const state = xss(req.body.state);
    const age = xss(req.body.age);
    const password = xss(req.body.password);
    const preferences = [];
    for (let preference of req.body.preferences){
      preferences.push(xss(preference));
    }
    const error = "";
    if (req.body.hasError){
       error = xss(req.body.error);
    }
    
    try {
      validation.validateUserAndBusinessInput(firstName, lastName, email, username, city, state, password);
      if (!gender) throw "Please select a dropdown from gender";
      if (!age) throw "Please select your age";
      if (!preferences) throw "Please select at least 1 preference";
      if (preferences.length > 5) throw "Select only up to 5 preferences";

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
          hasError: true,
          error: "Internal Server Error", 
          hasMessage:false
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
        error: e, 
        hasMessage:false
      });
      res.status(400);
      return;
    }
  });

  router.post('/signup/business', async (req, res) => {

    const firstName = xss(req.body.firstName);
    const lastName = xss(req.body.lastName);
    const email = xss(req.body.email);
    const username = xss(req.body.username);
    const city = xss(req.body.city);
    const state = xss(req.body.state);
    const password = xss(req.body.password);
    const businessType = [];
    for (let business of req.body.businessType){
      businessType.push(xss(business));
    }
    const error = "";
    if (req.body.hasError){
       error = xss(req.body.error);
    }
    
    try {

      validation.validateUserAndBusinessInput(firstName, lastName, email, username, city, state, password);
      if (!businessType) throw "Please select a dropdown from business type";
      if (businessType.length > 5) throw "Select only up to 5 categories";

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
          error: "Internal Server Error", 
          hasMessage:false
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
        error: e, 
        hasMessage:false
      });
      res.status(400);
      return;
    }
  });

  router.get('/login', async (req, res) => {
    if (!req.session.account_type) {
      res.render('main/login', {title: "Log In", hasError: false, hasMessage:false});
    } else {
      res.redirect('/explore');
    }
  });
  
  router.post('/login', async (req, res) => {
    const username = xss(req.body.username);
    const password = xss(req.body.password);
    const userType = xss(req.body.userType);
    
    try {
        validation.checkUserAndPassword(username, password);
        if(userType === 'User'){
            //username can either be email or the username - handled in the data folder
            const check = await userData.checkUser(username, password);
            if (check.authenticated === true) {
                req.session.user = username.toLowerCase();
                req.session.account_type = 'User';
              } 
              res.redirect('/explore');
        }
        else if (userType === 'Business'){
            req.session.account_type = 'Business';
            const check = await businessData.checkBusiness(username, password); 
            if (check.authenticated === true) {
                req.session.user = username.toLowerCase();
                req.session.account_type = 'Business';
                req.session.businessid = check.id;
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
        error: e, 
        hasMessage:false
      });
      req.session.account_type = null;
      res.status(400);
      return;
    }
    
  });
  
  router.get('/logout', async (req, res) => {
    if (!req.session.account_type) {
      res.redirect('/login');
    } else {
      res.render('main/logout', {title: "Logged Out", name: xss(req.session.user), isUser:false, isBusiness:false, hasError: false, hasMessage:false});
      req.session.destroy();
    }
  });

  router.get('/favorites', async (req, res) => {
    if (!req.session.account_type){
      res.redirect('/login');
    } else if (req.session.account_type == 'Business'){
      res.redirect('/explore');
    } else {
      try {
        let business = await userData.getFavorites(xss(req.session.user)); 
        res.render('main/favorites', {title: "Favorites", business: business, username: xss(req.session.user), hasError: false, hasMessage:false});
      } catch(e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        res.status(400);
        return;
      }
    }
    
  });
  
  module.exports = router;
  