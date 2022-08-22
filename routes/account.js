const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const businessData = data.business;

// routes: /settings...

router.get('/', async (req, res) =>{
    try {
        let accountSetting;
        if (!req.session.account_type){
            res.redirect('/login');
            return;
        } else if (req.session.account_type === 'User'){
            accountSetting = await userData.findUserByName(req.session.user); 
        } else if (req.session.account_type === 'Business'){
            accountSetting = await businessData.findBusinessByName(req.session.user);
            accountSetting = accountSetting[0];
        } else {
            res.redirect('/explore');
        }
        res.render('account/editAccount', {title: "Edit Account", accountType: req.session.account_type, default: accountSetting, hasError: false, hasMessage:false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        res.status(400);
    }
    
}); 

router.post('/user',  async (req, res) =>{
    try {
        let changes = req.body;
        if (!changes || !changes.preferences || changes.preferences.length == 0) throw "Please select at least 1 preferences!";
        if (changes.preferences.length>5) throw "Please select up to only 5 preferences!";
        await userData.updateUserData(req.session.user, changes.preferences); 
        res.render('explore/explore', {title: 'Explore', hasError: false, hasMessage: true, message: "Successfully changed settings."});
    } catch (e) {
        try {
            let accountSetting = await userData.findUserByName(req.session.user);
            res.render('account/editAccount', {title: "Edit Account", accountType: req.session.account_type, default: accountSetting, hasError: true, error: e, hasMessage:false});
        } catch (e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        } 
        res.status(400);
    }
}); 

router.post('/business',  async (req, res) =>{
    try {
        let changes = req.body;
        if (!changes || !changes.businessType || changes.businessType.length == 0) throw "Please select at least 1 category!";
        if (changes.businessType.length>5) throw "Please select up to only 5 categories!";
        await businessData.updateBusinessData(req.session.user, changes.businessType); 
        res.render('explore/explore', {title: 'Explore', hasError: false, hasMessage: true, message: "Successfully changed settings."});
    } catch (e) {
        try {
            let accountSetting = await businessData.findBusinessByName(req.session.user);
            res.render('account/editAccount', {title: "Edit Account", accountType: req.session.account_type, default: accountSetting, hasError: true, error: e, hasMessage:false});
        } catch (e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        }
        res.status(400);
    }
})

module.exports = router;