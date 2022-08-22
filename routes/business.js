const express = require('express');
const router = express.Router();
const data = require('../data');
const businessData = data.business;
const userData = data.users;
const postData = data.posts;
const reviewData = data.reviews;
const validation = data.validation;

// routes: /business...

router.get('/:businessid', async (req, res) =>{
    try {
        let businessid = req.params.businessid; 
        businessid = validation.checkId(businessid);
        let business = await businessData.getBusinessById(businessid); 
        let postList = await postData.getAllPostByBusiness(business.username);
        let reviews = await reviewData.getReviewsByBusinessName(business.username);
        let rating = await reviewData.getAverageRating(reviews); // use reviews to compute average rating. is 0 for no reviews.
        res.render('business/index', {title: 'Business Details', business: business, rating: rating, reviews: reviews, posts: postList, hasError: false, hasMessage:false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        res.status(400);
    }
}); 

router.get('/post/:postid',  async (req, res) =>{
    let postid = req.params.postid; 
    try {
        postid = validation.checkId(postid);
        let post = await postData.getPostById(postid); 
        res.render('business/post', {title: 'Post Details', post: post, postid:postid, hasError: false, hasMessage:false});
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        res.status(400);
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
        } else {
            businessid = validation.checkId(businessid);
            let business = await businessData.getBusinessById(businessid); 
            res.render('business/review', {title: 'Write a Review', business: business, hasError: false, hasMessage:false, hasMessage:false});
        }
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        res.status(400);
    }
}); 

router.post('/:businessid/review',  async (req, res) =>{
    let businessid = req.params.businessid; 
    const {ratingRange, reviewText} = req.body;
    try {
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "User") {
            res.redirect(`/business/${businessid}`);
        } else {
            businessid = validation.checkId(businessid);

            if (!ratingRange) throw "Please enter a rating from 1-10!"
            if (!reviewText) throw "Please write something to review the business on!"
            if (typeof reviewText !== 'string') throw "Review must be a string!";

            let business = await businessData.getBusinessById(businessid); 
            await reviewData.createReview(req.session.user, business.username, ratingRange, reviewText); 
            // reload business page with updated info
            let postList = await postData.getAllPostByBusiness(business.username);
            let reviews = await reviewData.getReviewsByBusinessName(business.username);
            let rating = await reviewData.getAverageRating(reviews);
            res.render('business/index', {title: 'Business Details', business: business, rating: rating, reviews: reviews, posts: postList, hasError: false, hasMessage:true, message: "Successfully created new review!"});
        }
    } catch (e) {
        // if there's an error, attempt to show it on review page
        try {
            businessid = validation.checkId(businessid);
            let business = await businessData.getBusinessById(businessid); 
            res.render('business/review', {title: 'Write a Review', business: business, ratingRange: ratingRange, reviewText: reviewText, hasError: true, error: e, hasMessage:false});
        } catch(e){
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        }
        res.status(400);
    }
}); 

router.get('/:businessid/new',  async (req, res) =>{
    let businessid = req.params.businessid; 
    try {
        businessid = validation.checkId(businessid);
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "Business") {
            res.redirect(`/business/${businessid}`);
        } else {
            let business = await businessData.getBusinessById(businessid); 
            if (business.username !== req.session.user){
                res.redirect(`/business/${businessid}`);
            }
            res.render('business/new', {title: 'New Post', business: business, hasError: false, hasMessage:false});
        }
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        res.status(400);
    }
}); 

router.post('/:businessid/new',  async (req, res) =>{
    let businessid = req.params.businessid; 
    const {postTitle, postImage, postText} = req.body;
    try {
        businessid = validation.checkId(businessid);
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "Business") {
            res.redirect(`/business/${businessid}`);
        } else {
            if (!postTitle) throw "Please enter a title for the post!"
            if (!postImage) throw "Please enter image URL!"
            if(!postText) throw "Please enter text for the post!"
            if (typeof postTitle,postText !== 'string') throw "Post must be a string!";
            
            let business = await businessData.getBusinessById(businessid); 
            await postData.createNewPost(business.username, postTitle, postImage, postText); 
            // reload business page with updated info
            let postList = await postData.getAllPostByBusiness(business.username);
            let reviews = await reviewData.getReviewsByBusinessName(business.username);
            let rating = await reviewData.getAverageRating(reviews);
            res.render('business/index', {title: 'Business Details', business: business, rating: rating, reviews: reviews, posts: postList, hasError: false, hasMessage:true, message: "Successfully created new post!"});
        }
    } catch (e) {
        try {
            businessid = validation.checkId(businessid);
            let business = await businessData.getBusinessById(businessid); 
            res.render('business/new', {title: 'New Post', business: business, postTitle: postTitle, postImage: postImage, postText: postText, hasError: true, error: e, hasMessage:false});
        } catch(e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        }
        res.status(400);
    }
}); 

router.post('/:businessid/favorite',  async (req, res) =>{
    let businessid = req.params.businessid; 
    try {
        businessid = validation.checkId(businessid);
        if (!req.session.account_type || req.session.account_type === "Business"){
            res.redirect(`/business/${businessid}`);
        } else {
            let business = await businessData.getBusinessById(businessid); 
            await userData.addToFavorite(req.session.user, business.username); 
            // reload business page with updated info
            let postList = await postData.getAllPostByBusiness(business.username);
            let reviews = await reviewData.getReviewsByBusinessName(business.username);
            let rating = await reviewData.getAverageRating(reviews);
            res.render('business/index', {title: 'Business Details', business: business, rating: rating, reviews: reviews, posts: postList, hasError: false, hasMessage:true, message: "Successfully added business to favorites!"});
        }
    } catch (e) {
        try {
            // show error on business page if possible
            let business = await businessData.getBusinessById(businessid); 
            let postList = await postData.getAllPostByBusiness(business.username);
            let reviews = await reviewData.getReviewsByBusinessName(business.username);
            let rating = await reviewData.getAverageRating(reviews);
            res.render('business/index', {title: 'Business Details', business: business, rating: rating, reviews: reviews, posts: postList, hasError: true, hasMessage:false, e: e});
        } catch(e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        }
        res.status(500);
    }
}); 

router.get('/post/:postid/edit',  async (req, res) =>{
    let postid = req.params.postid; 
    try {
        postid = validation.checkId(postid);
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "Business") {
            res.redirect(`/post/${postid}`);
        } else {
            let post = await postData.getPostById(postid); 
            res.render('business/edit', {title: 'Edit Post', post: post, hasError: false, hasMessage:false});
        }
    } catch (e) {
        res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        res.status(400);
    }
}); 

router.post('/post/:postid/edit',  async (req, res) =>{
    let postid = req.params.postid;   
    const {postTitle, postImage, postText} = req.body;
    try {
        postid = validation.checkId(postid);
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "Business") {
            res.redirect(`/post/${postid}`);
        } else {
            if (!postTitle) throw "Please enter a title for the post!"
            if (!postImage) throw "Please enter image URL!"
            if(!postText) throw "Please enter text for the post!"
            if (typeof postTitle,postText !== 'string') throw "Post must be a string!";

            await postData.editPost(postid, postTitle, postImage, postText); 
            let post = await postData.getPostById(postid); 
            res.render('business/post', {title: 'Post Details', post: post, postid:postid, hasError: false, hasMessage:true, message: "Successfully edited post!"});
        }
    } catch (e) {
        try {
            postid = validation.checkId(postid);
            let post = await postData.getPostById(postid); 
            res.render('business/edit', {title: 'Edit Post', post: post, postTitle:postTitle, postImage:postImage, postText:postText, hasError: true, error: e, hasMessage:false});
        } catch(e) {
            res.render('explore/explore', {title: 'Explore', hasError: true, hasMessage: false, error: e});
        }
        res.status(400);
    }
}); 

router.post('/post/:postid/delete',  async (req, res) =>{
    let postid = req.params.postid;  
    try {
        if (!req.session.account_type){
            res.redirect('/login');
        } else if (req.session.account_type != "Business") {
            res.redirect(`/post/${postid}`);
        } else {
            postid = validation.checkId(postid);
            await postData.deletePost(req.session.user, postid); 
            res.render('explore/explore', {title: 'Explore', hasError: false, hasMessage: true, message: "Successfully deleted post!"});
        }
    } catch (e) {
        res.render('business/edit', {title: 'Edit Post', hasError: true, error: e, hasMessage:false});
        res.status(400);
    }
}); 


module.exports = router;