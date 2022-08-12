const express = require('express');
const router = express.Router();
const data = require('../data');
const businessData = data.businesses;

router.get('/explore', async (req, res) =>{
    res.render('explore/explore', {title: 'Explore', hasError: false});
}); 

router.post('/explore/browse',  async (req, res) =>{
    try {
        let category = req.body;
        businessList = await businessData.findBusinessByCategory(category); 
        res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
}); 

router.post('/explore/search',  async (req, res) =>{
    try {
        let name = req.body;
        businessList = await businessData.findBusinessByName(name); 
        res.render('explore/explore', {title: 'Explore', business: businessList, hasError: false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, error: e});
    }
})