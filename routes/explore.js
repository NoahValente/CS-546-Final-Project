const express = require('express');
const router = express.Router();
const data = require('../data');
const businessData = data.business;

router.get('/', async (req, res) =>{
    if(!req.session.user){
        res.redirect('/login');
    }
    res.render('explore/explore', {title: 'Explore', hasError: false});
}); 

router.post('/browse',  async (req, res) =>{
    
    
    try {
        let category = req.body.category;
        if (!category) throw "Please enter a category";
        businessList = await businessData.findBusinessByCategory(category); 
        res.send(businessList);
        
    } catch (e) {
        res.send(e);
    }
}); 

router.post('/search',  async (req, res) =>{

    try {
        let name = req.body.name;  
        if (!name) throw "Please enter a business name";
        businessList = await businessData.findBusinessByName(name); 
        res.send(businessList); 
    } catch (e) {
        res.send(e);
    }
})

module.exports = router;
