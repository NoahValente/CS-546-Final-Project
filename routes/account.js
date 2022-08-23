const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const userData = data.users;
const businessData = data.business;

// routes: /settings...

router.get('/', async (req, res) =>{
    try {
        let accountSetting;
        let accountTypeName;
        let isUser;
        let isBusiness;
        if (!req.session.account_type){
            res.redirect('/login');
            return;
        } else if (req.session.account_type === 'User'){
            accountTypeName = "user";
            isUser = true;
            isBusiness = false;
            accountSetting = await userData.findUserByName(xss(req.session.user)); 
        } else if (req.session.account_type === 'Business'){
            isUser = false;
            isBusiness = true;
            accountTypeName = "business"
            accountSetting = await businessData.findBusinessByName(xss(req.session.user));
            accountSetting = accountSetting[0];
        } else {
            res.redirect('/explore');
            return;
        }
        res.render('account/editAccount', {title: "Edit Account", accountType: accountTypeName, default: accountSetting, hasError: false, hasMessage:false, isUser: isUser, isBusiness: isBusiness});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        res.status(400);
    }
    
}); 

router.post('/user',  async (req, res) =>{
    try {
        let changes = [];
        for (let change of req.body.preferences){
            changes.push(xss(change));
            
        }
        if (!changes || changes.length == 0) throw "Please select at least 1 preference!";
        if (changes.length > 5) throw "Please select up to only 5 preferences!";
        await userData.updateUserData(xss(req.session.user), changes); 
        res.render('explore/explore', {title: 'Explore', hasError: false, hasMessage: true, message: "Successfully changed settings."});
    } catch (e) {
        try {
            let accountSetting = await userData.findUserByName(xss(req.session.user));
            res.render('account/editAccount', {title: "Edit Account", accountType: "user", default: accountSetting, hasError: true, error: e, hasMessage:false});
        } catch (e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        } 
        res.status(400);
    }
}); 

router.post('/business',  async (req, res) =>{
    try {
        let changes = [];
        for (let change of req.body.businessType){
            changes.push(xss(change));
            
        }
        //console.log(changes);
        if (!changes  || changes.length == 0) throw "Please select at least 1 category!";
        if (changes.length>5) throw "Please select up to only 5 categories!";
        await businessData.updateBusinessData(xss(req.session.user), changes); 
        res.render('explore/explore', {title: 'Explore', hasError: false, hasMessage: true, message: "Successfully changed settings."});
    } catch (e) {
        try {
            let accountSetting = await businessData.findBusinessByName(xss(req.session.user));
            res.render('account/editAccount', {title: "Edit Account", accountType: "business", default: accountSetting, hasError: true, error: e, hasMessage:false});
        } catch (e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        }
        res.status(400);
    }
})

module.exports = router;