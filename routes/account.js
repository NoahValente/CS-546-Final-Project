const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const businessData = data.business;

// routes: /settings...

router.get('/user', async (req, res) =>{
    if (!req.session.account_type){
        res.redirect('/login');
    }
    if (req.session.account_type != 'User'){
        res.redirect('/explore');
    }
    let userSetting = await userData.getInfo(req.session.user); 
    res.render('account/editUser', {userData: userSetting, hasError: false});
}); 

router.post('/user',  async (req, res) =>{
   let user = req.body;
   //TODO: disable text inputs that we dont want to change..like account type
   user = await userData.updateUserData(user); 
   res.redirect('/settings/user'); 
}); 

router.get('/business', async (req, res) =>{
    if (!req.session.account_type){
        res.redirect('/login');
    }
    if (req.session.account_type != 'Business'){
        res.redirect('/explore');
    }
    let businessSetting = await businessData.getInfo(req.session.user); 
    res.render('account/editBusiness', {businessData: businessSetting, hasError:false});
}); 

router.post('/business',  async (req, res) =>{
   let business = req.body;
   //TODO: disable text inputs that we dont want to change..like account type
   business = await businessData.updatBusinessData(business); 
   res.redirect('/settings/business'); 
})

module.exports = router;