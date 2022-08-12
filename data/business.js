const mongoCollections = require('../config/mongoCollections');
const businesses = mongoCollections.businesses;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const validation = require('./validation');

module.exports = {

    async createBusiness(firstName, lastName, username, email, city, state, password, businessType) {
        // check shared inputs with user
        validation.validateUserAndBusinessInput(firstName, lastName, email, username, city, state, password);

        // check business type array, should have 1-5 elements
        if (!businessType) throw "Please select a dropdown from business type"; //drop down, no need to check further.
        if (businessType.length > 5) throw "Select only up to 5 categories"

        const businessCollection = await businesses();

        username = username.toLowerCase();
        const business = await businessCollection.findOne({username: username});
        if (business) { throw "A user with this username already exists!" };


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
    },
    async checkBusiness(username, password) {
        validation.checkUserAndPassword(username, password);

        const businessCollection = await businesses();
        username = username.toLowerCase();
        const business = await businessCollection.findOne({username: username});

        if (!business) { throw "Username or password is invalid" };

        let hashedPW = business.password;
        let correctPW = false;
        try { correctPW = await bcrypt.compare(password, hashedPW); } catch(e) {}

        if (!correctPW) {throw "Username or password is invalid";}
        else {return {authenticated: true}; }
    },

    async findBusinessByCategory(category) {
        if (!category) throw "Please enter a category";
        const businessCollection = await businesses();
        const businessList = await businessCollection.find( {businessType: category}).toArray();
        if (businessList.length==0) throw "No business found!"
        return businessList;
    },

    async findBusinessByName(username) {
        if (!username) throw "Please enter a business name";
        const businessCollection = await businesses();
        username = username.toLowerCase();
        const business = await businessCollection.findOne( {username: username});
        if (!business) throw "No business found!"
        return [business];
    }
};
