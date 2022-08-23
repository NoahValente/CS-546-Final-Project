const express = require('express');
const router = express.Router();
const data = require('../data');
const businessData = data.business;
const xss = require('xss');

router.get('/', async (req, res) =>{
    
    res.render('explore/explore', {title: 'Explore', hasError: false, hasMessage:false});
}); 

router.post('/browse',  async (req, res) =>{
    try {
        let category = xss(req.body.category);
        if (!category) throw "Please enter a category";
        businessList = await businessData.findBusinessByCategory(category); 
        res.send(businessList);
    } catch (e) {
        res.send(e);
    }
}); 

router.post('/search',  async (req, res) =>{
    try {
        const businessName = xss(req.body.businessName);
        if (!businessName) throw "Please enter a business name";
        businessList = await businessData.findBusinessByName(businessName); 
        res.send(businessList);
    } catch (e) {
        res.send(e);
    }
})

module.exports = router;
