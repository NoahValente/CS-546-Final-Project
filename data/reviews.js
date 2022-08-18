const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const users = mongoCollections.users;
const businesses = mongoCollections.businesses;
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
        //return newInsertInformation; // use this return for testing.
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

    async getReviewsByBusinessName(businessName){
        const businessCollection = await businesses();
        businessName = businessName.toLowerCase(); 

        const business = await businessCollection.findOne({username: businessName}); 
        if (!business) throw "No business found"

        const reviewCollection = await reviews();
        let review; // will keep track of current review
        let reviewList = []; // will store all the reviews for the business
        let userReviews = business.userReviews; // array of review Ids for the business. 

        // tried using a for each loop but it apparently doesn't work with async. 
        for (let i = 0; i<userReviews.length; i++) {
            review = await reviewCollection.findOne({_id: ObjectId(userReviews[i])});
            if (review == null) continue;
            reviewList.push(review);
        }
        return reviewList;
    },

    async getAverageRating(reviewList) {
        let summedRating = 0;
        let numRatings = 0;
        for (let i = 0; i<reviewList.length; i++) {
            if (reviewList[i] != null) {
                summedRating+=reviewList[i].rating;
                numRatings++;
            }
        }
        if (summedRating == 0) return 0; // no ratings returns a rating of 0. to be handled on front end.
        return summedRating/numRatings;
    }

}

