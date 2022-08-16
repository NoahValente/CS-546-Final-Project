const express = require('express');
const router = express.Router();
const data = require('../data');
const businessData = data.business;
const postData = data.posts;
const reviewData = data.reviews;

// routes: /business...

//TODO: make sure function names and handlebar parameters are consistent with db and html
router.get('/:businessid', async (req, res) =>{
    try {
        let isBusiness = false;
        let isUser = false;
        if (req.session.account_type && req.session.account_type === 'Business'){
            isBusiness = true;
        }
        if (req.session.account_type && req.session.account_type === 'User'){
            isUser = true;
        }
        let businessid = req.params.businessid; 
        let business = await businessData.getBusinessById(businessid); 
        let postList = await postData.getAllPostByBusiness(business.username);
        let rating = await reviewData.getAverageRating(business.username);
        let reviews = await reviewData.getReviewByBusinessName(business.username);
        res.render('business/index', {title: 'Business Details', business: business, rating: rating, reviews: reviews, posts: postList, hasError: false, isBusiness: isBusiness, isUser:isUser});
    } catch (e) {
        res.render('business/index', {title: 'Business Details', hasError: true, error: e});
    }
}); 

router.get('/post/:postid',  async (req, res) =>{
    let isBusiness = false;
    if (req.session.account_type && req.session.account_type === 'Business'){
        isBusiness = true;
    }
    try {
        let postid = req.params.postid; 
        let post = await postData.getPostById(postid); 
        res.render('business/post', {title: 'Post Details', post: post, postid:postid, hasError: false, isBusiness: isBusiness});
    } catch (e) {
        res.render('business/post', {title: 'Post Details', hasError: true, error: e});
    }
});

// User-only page for creating a review
// TODO: if edit/delete review is implemented, need to adjust /../review
router.get('/:businessid/review',  async (req, res) =>{
    let businessid = req.params.businessid; 
    try {
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "User") {
            res.redirect(`/business/${businessid}`);
        }
        let business = await businessData.getBusinessById(businessid); 
        res.render('business/review', {title: 'Write a Review', business: business, hasError: false});
    } catch (e) {
        res.render('business/review', {title: 'Write a Review', hasError: true, error: e});
    }
}); 

router.post('/:businessid/review',  async (req, res) =>{
    let businessid = req.params.businessid; 
    try {
        const {rating, text} = req.body;
        let business = await businessData.getBusinessById(businessid); 
        await reviewData.createReview(req.session.user, business.username, rating, text); 
        res.redirect(`/business/${businessid}`);
    } catch (e) {
        res.render('business/review', {title: 'Write a Review', hasError: true, error: e});
    }
}); 

router.get('/:businessid/new',  async (req, res) =>{
    let businessid = req.params.businessid; 
    try {
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "Business") {
            res.redirect(`/business/${businessid}`);
        }
        let business = await businessData.getBusinessById(businessid); 
        if (business.username !== req.session.user){
            res.redirect(`/business/${businessid}`);
        }
        res.render('business/new', {title: 'New Post', business: business, hasError: false});
    } catch (e) {
        res.render('business/new', {title: 'New Post', hasError: true, error: e});
    }
}); 

router.post('/:businessid/new',  async (req, res) =>{
    let businessid = req.params.businessid; 
    try {
        const {title, image, text} = req.body;
        let business = await businessData.getBusinessById(businessid); 
        await postData.createNewPost(business.username, title, image, text); 
        res.redirect(`/business/${businessid}`);
    } catch (e) {
        res.render('business/new', {title: 'New Post', hasError: true, error: e});
    }
}); 

router.get('/post/:postid/edit',  async (req, res) =>{
    let postid = req.params.postid; 
    try {
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "Business") {
            res.redirect(`/post/${postid}`);
        }
        let post = await postData.getPostById(postid); 
        res.render('business/edit', {title: 'Edit Post', post: post, hasError: false});
    } catch (e) {
        res.render('business/edit', {title: 'Edit Post', hasError: true, error: e});
    }
}); 

router.post('/post/:postid/edit',  async (req, res) =>{
    let postid = req.params.postid;  
    try {
        const {title, image, text} = req.body;
        await postData.updatePost(postid, title, image, text); 
        res.redirect(`/post/${postid}`);
    } catch (e) {
        res.render('business/edit', {title: 'Edit Post', hasError: true, error: e});
    }
}); 


module.exports = router;