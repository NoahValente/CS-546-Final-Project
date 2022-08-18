const business = require('../business');
const users = require('../users');
const reviews = require('../reviews');
const connection = require('../../config/mongoConnection');

/* Review Tests */

// **NOTE. These tests will work ONLY if createReview return type is CHANGED. 
// to run these tests, change the return of createReview to the object created instead of {reviewInserted: True}
const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    let user1, business1, review1, review2, reviewList, editedReview, reviewList2;

    try {
        user1 = await users.createUser("Cavin", "Gada", "cavingada@gmail.com", "cavingada","Male", "Paramus", "NJ", 19, "cavingada", ["Art", "Music", "Clothing"]);
    } catch(e) {
        console.log(e);
    }

    try {
        business1 = await business.createBusiness("Frank", "Pizza",  "frankpizza", "frankpizza@gmail.com", "Paramus", "NJ", "frankspizza",["Food", "Fitness", "Art"]);
    } catch(e) {
        console.log(e);
    }

    try {
        review1 = await reviews.createReview("cavingada", "frankpizza", 10, "Amazing food. Absolutely delicious. Good price.")
    } catch(e){ 
        console.log(e)
    }

    try {
        review2 = await reviews.createReview("cavingada", "frankpizza", 8, "Food was great again, but customer service was ok.")
    } catch(e){ 
        console.log(e)
    }

    try {
        reviewList = await reviews.getReviewsByBusinessName("frankpizza");
        console.log(reviewList);
    } catch(e){ 
        console.log(e)
    }

    try {
        editedReview = await reviews.editReview("cavingada", review1.insertedId, 1, "food was not great");
    } catch(e) {
        console.log(e);
    }

    
    try {
        deletedReview = await reviews.deleteReview("cavingada", "frankpizza", review2.insertedId);
    } catch(e) {
        console.log(e);
    }

    try {
        reviewList2 = await reviews.getReviewsByBusinessName("frankpizza");
        console.log(reviewList2);
    } catch(e){ 
        console.log(e)
    }
    
    await connection.closeConnection();
}

main();