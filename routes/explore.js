const express = require('express');
const router = express.Router();
const data = require('../data');
const businessData = data.business;

// routes: /explore...
//okay
router.get('/', async (req, res) =>{
    if(!req.session.user){
        res.redirect('/login');
    }
    res.render('explore/explore', {title: 'Explore', hasError: false});
}); 

router.post('/:category',  async (req, res) =>{
    
    //console.log("testing")
    try {
        let category = req.params.category;
        businessList = await businessData.findBusinessByCategory(category); 
        res.send(businessList);
        //res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.send(e);
        //res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
});


/*
router.post('/browse',  async (req, res) =>{
    
    console.log("testing")
    try {
        let category = req.body;
        businessList = await businessData.findBusinessByCategory(category); 
        res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
}); */
/*
router.post('/search',  async (req, res) =>{
    console.log("testing")
    try {
        let name = req.body; 
        console.log(req.body)
        businessList = await businessData.findBusinessByName(name); 
        res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
})*/
router.post('/:name',  async (req, res) =>{
    //console.log("testing")
    try {
        let name = req.params.name; 
        //console.log(req.body)
        businessList = await businessData.findBusinessByName(name); 
        res.send(businessList);
        //res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.send(e);
        //res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
})

/*
router.post('/:name',  async (req, res) =>{
    try {
        //console.log(req.params.name);
        console.log("HEY");
        let name = req.params.name;
        await business.createBusiness("Cavin1", "Gada1", "cavingada@gmail.com", "cavingada1", "Paramus", "NJ", "cavingada", ["Convenience", "Fitness", "Art"]);
        businessList = await businessData.findBusinessByName(req.params.name); 
        console.log(businessList)
        res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
})
router.get('/:name',  async (req, res) =>{
    try {
        console.log(req.params.name);
        console.log("HEY");
        let name = req.params.name;
        //console.log(await business.createBusiness("Cavin1", "Gada1", "cavingada@gmail.com", "cavingada1", "Paramus", "NJ", "cavingada", ["Convenience", "Fitness", "Art"]));
        //businessList = await businessData.findBusinessByName(name); 
        let businessList=[];
        console.log(businessList)
        res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
})*/

module.exports = router;
