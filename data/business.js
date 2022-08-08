const mongoCollections = require('../config/mongoCollections');
const businesses = mongoCollections.businesses;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const validation = require('./validation');

// firstName, last Name, email, username, city, state, password
module.exports = {

    async createBusiness(firstName, lastName, username, email, city, state, password, businessType) {
        validation.validateUserAndBusinessInput(firstName, lastName, email, username, city, state, password);
        // check gender input
        if (!businessType) throw "Please select a dropdown from business type"; //drop down, no need to check further.
        
        const businessCollection = await businesses();

        const business = await businessCollection.findOne({username: username});
        if (user) { throw "A user with this username already exists!" };


        const hashedPW = await bcrypt.hash(password,16);

        let newBusiness = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            city: city,
            state: state,
            password: hashedPW,
            businessType: businessType,
            userReviews: [],
            businessPost: []
           
        }

        const newInsertInformation = await businessCollection.insertOne(newBusiness);
        if (!newInsertInformation.insertedId) throw 'Insert failed!';
        else { return {userInserted: true};}
    }
};