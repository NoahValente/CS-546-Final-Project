const connection = require('../config/mongoConnection');
const data = require("../data");
const users = data.users;
const business = data.business;
const posts = data.posts;
const reviews = data.reviews;

const main = async () => {
    /* start connection */
    const db = await connection.dbConnection();
    await db.dropDatabase();

    /* populate users */
    let user1, user2;

    user1 = await users.createUser("Cavin", "Gada", "cavingada@gmail.com", "cavingada","Male", "Paramus", "NJ", 19, "cavingada", ["Art", "Music", "Clothing"]);
    user2 = await users.createUser("Don", "Joe", "djoe@gmail.com", "donjoe23","Female", "Oakland", "CA", 32, "applebanana15", ["Convenience", "Appearance", "Sports", "Food"]);

    /* populate businesses */
    let business1, business2;

    business1 = await business.createBusiness("Saul", "Goodman",  "saulAgencies", "sgoodman@gmail.com", "Hoboken", "NJ", "saulagencies",["Food", "Fitness", "Art"]);
    business2 = await business.createBusiness("Frank", "DiGornio",  "Napolis", "napolisPizza@gmail.com", "Hoboken", "NJ", "napolispizza",["Food"]);

    /* populate reviews */
    let review1, review2, review3, review4;

    review1 = await reviews.createReview("cavingada", "saulAgencies",10, "I was charged with 5 counts of grand theft auto, but got out of it because of Saul.");
    review2 = await reviews.createReview("cavingada", "Napolis",8, "Pizza was great, but it took years for it to finally come.");
    review3 = await reviews.createReview("donjoe23", "saulAgencies",2, "Saul took my money and left me. He is a thief. But he is handsome, so he gets a 2.");
    review4 = await reviews.createReview("donjoe23", "Napolis",10, "Ordered the vodka pizza and it was brilliant. Had a great time with friends and service was amazing.");
    
    /* stop connection */
    await connection.closeConnection();
}

main().catch(console.log);