const express = require('express');
const router = express.Router();
const data = require('../data');
const businessData = data.businesses;

// routes: /explore...
//okay
router.get('/', async (req, res) =>{
    res.render('explore/explore', {title: 'Explore', hasError: false});
}); 

router.post('/browse',  async (req, res) =>{
    try {
        let category = req.body;
        businessList = await businessData.findBusinessByCategory(category); 
        res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
}); 

router.post('/search',  async (req, res) =>{
    try {
        let name = req.body;
        businessList = await businessData.findBusinessByName(name); 
        res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
})

module.exports = router;
