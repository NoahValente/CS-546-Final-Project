const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const businessData = data.business;

// routes: /settings...

router.get('/', async (req, res) =>{
    try {
        let isBusiness = false;
        let isUser = false;
        let accountSetting;
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type === 'User'){
            isUser = true;
            accountSetting = await userData.findUserByName(req.session.user); 
        } else if (req.session.account_type === 'Business'){
            isBusiness = true;
            accountSetting = await businessData.findBusinessByName(req.session.user);
            accountSetting = accountSetting[0];
        } else {
            res.redirect('/explore');
        }
        res.render('account/editAccount', {title: "Edit Account", accountType: req.session.account_type, default: accountSetting, isBusiness: isBusiness, isUser: isUser, hasError: false, hasMessage:false});
    } catch (e) {
        res.render('account/editAccount', {title: "Edit Account", isBusiness: false, isUser: false, hasError: true, error: e, hasMessage:false});
    }
    
}); 

router.post('/user',  async (req, res) =>{
    try {
        let changes = req.body;
        if (!changes || !changes.preferences || changes.preferences.length == 0) throw "Please select at least 1 preferences!"
        if (changes.preferences.length>5) throw "Please select up to only 5 preferences!"
        await userData.updateUserData(req.session.user, changes.preferences); 
        res.render('explore/explore', {title: 'Explore', hasError: false, hasMessage: true, message: "Successfully changed settings."});
    } catch (e) {
        try {
            let accountSetting = await userData.findUserByName(req.session.user);
            res.render('account/editAccount', {title: "Edit Account", accountType: req.session.account_type, default: accountSetting, isBusiness: false, isUser: true, hasError: true, error: e, hasMessage:false});
        } catch (e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        } 
    }
}); 

router.post('/business',  async (req, res) =>{
    try {
        let changes = req.body;
        if (!changes || !changes.businessType || changes.businessType.length == 0) throw "Please select at least 1 category!"
        if (changes.businessType.length>5) throw "Please select up to only 5 categories!"
        await businessData.updateBusinessData(req.session.user, changes.businessType); 
        res.render('explore/explore', {title: 'Explore', hasError: false, hasMessage: true, message: "Successfully changed settings."});
    } catch (e) {
        try {
            let accountSetting = await businessData.findBusinessByName(req.session.user);
            res.render('account/editAccount', {title: "Edit Account", accountType: req.session.account_type, default: accountSetting, isBusiness: true, isUser: false, hasError: true, error: e, hasMessage:false});
        } catch (e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        }
    }
})

module.exports = router;