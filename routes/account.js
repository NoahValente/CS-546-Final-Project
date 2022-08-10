const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const businessData = data.businesses;

router.get('/settings/user', async (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    }
    if (req.session.user != 'user'){
        res.redirect('/explore');
    }
    let userSetting = await userData.getInfo(req.session.user); 
    res.render('account/editUser', {userData: userSetting});
}); 

router.post('/settings/user',  async (req, res) =>{
   let user = req.body;
   //TODO: disable text inputs that we dont want to change..like account type
   user = await userData.updateUserData(user); 
   res.redirect('/settings/user'); 
}); 

outer.get('/settings/business', async (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    }
    if (req.session.user != 'business'){
        res.redirect('/explore');
    }
    let businessSetting = await businessData.getInfo(req.session.user); 
    res.render('account/editBusiness', {businessData: businessSetting});
}); 

router.post('/settings/business',  async (req, res) =>{
   let business = req.body;
   //TODO: disable text inputs that we dont want to change..like account type
   business = await businessData.updatBusinessData(business); 
   res.redirect('/settings/business'); 
})