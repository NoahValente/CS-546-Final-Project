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
    
    console.log("testing")
    try {
        let category = req.body.category;
        businessList = await businessData.findBusinessByCategory(category); 
        res.send(businessList);
        
    } catch (e) {
        res.send(e);
    }
}); 

router.post('/search',  async (req, res) =>{

    try {
        let name = req.body.name;  

        console.log(req.body.name)
        businessList = await businessData.findBusinessByName(name); 
        console.log(businessList);
        res.send(businessList); 
    } catch (e) {
        res.send(e);
    }
})

module.exports = router;
