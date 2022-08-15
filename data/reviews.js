const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const users = mongoCollection.users;
const businesses = mongoCollection.businesses;
const {ObjectId, ObjectID} = require('mongodb');
const validation = require('./validation');


module.exports = {
    async createReview(userName, businessName, rating, reviewText){
        // we can assume userName and businessName are correct. 
        if (!rating) throw "Please enter a rating from 1-10!"
        // dont need to check if number since rating will be a dropdown of type number from 1-10
        if (!reviewText) throw "Please write something to review the business on!"
        if (typeof reviewText !== 'string') throw "Review must be a string!";

        let newReview = {
            userId: userName,
            businessId: businessName,
            rating: rating,
            reviewText: reviewText
        }

        // add to reviews database
        const reviewCollection = await reviews();
        const newInsertInformation = await reviewCollection.insertOne(newReview);
        if (!newInsertInformation.insertedId) throw 'Insert failed!';

        // add to users database
        const userCollection = await users();
        userName = userName.toLowerCase(); 
        const user = await userCollection.updateOne({username: userName}, {$push:{userReviews: newInsertInformation.insertedId.toString()}}); 
        if (!user) throw "Internal database problem"

        // add to businesses database
        const businessCollection = await businesses();
        businessName = businessName.toLowerCase();
        const business = await businessCollection.updateOne({username: businessName}, {$push:{userReviews: newInsertInformation.insertedId.toString()}}); 
        if (!business) throw "Internal database problem"
        
        return {reviewInserted: true};
        
    },

    async deleteReview(userName, businessName, reviewID){
        const reviewCollection = await reviews();
        const review = await reviewCollection.remove({_id: ObjectId(reviewID)});
        if (!review) { throw "Review does not exist" };

        const userCollection = await users();
        userName = userName.toLowerCase(); 
        const user = await userCollection.updateOne({username: userName}, {$pull:{userReviews: reviewID}}); 
    },

    async editReview(userName, reviewID, rating, reviewText){
        // we can assume userName and businessName are correct. 
        if (!rating) throw "Please enter a rating from 1-10!"
        // dont need to check if number since rating will be a dropdown of type number from 1-10
        if (!reviewText) throw "Please write something to review the business on!"
        if (typeof reviewText !== 'string') throw "Review must be a string!";

        // just update the fields in the review database, id, username, and business name all stay the same.
        const reviewCollection = await reviews();
        const review = await reviewCollection.updateOne({_id: ObjectId(reviewID)}, {$set:{ rating: rating, reviewText:reviewText}});
        if (!review) { throw "Review does not exist" };
    },

    async getReviewByBusinessName(businessName){
        const businessCollection = await businesses();
        businessName = businessName.toLowerCase(); 

        const business = await businessCollection.findOne({username: businessName}); 
        if (!business) throw "No business found"

        const reviewCollection = await reviews();
        let review; // will keep track of current review
        let reviewList; // will store all the reviews for the business
        let userReviews = business.userReviews; // array of review Ids for the business. 

        userReviews.forEach(element => {
            review = reviewCollection.findOne({_id: ObjectId(element)});
            reviewList.push(review);
        });

        return reviewList;
    }

}

