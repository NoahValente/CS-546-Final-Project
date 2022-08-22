const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const validation = require('./validation');
const businessData = require('./business');

// firstName, last Name, email, username, city, state, password
module.exports = {

    async createUser(firstName, lastName, email, username, gender, city, state, age, password, preferences) {
        validation.validateUserAndBusinessInput(firstName, lastName, email, username, city, state, password);
        // check gender input
        if (!gender) throw "Please select a dropdown from gender"; //drop down, no need to check further.
        
        // check age input
        if (!age) throw "Please select your age" // again another dropdown. 

        // check preferences selection
        if (!preferences) throw "Please select at least 1 preference"
        if (preferences.length > 5) throw "Select only up to 5 preferences"
        const userCollection = await users();
        username = username.toLowerCase();
        const user = await userCollection.findOne({username: username});
        if (user) { throw "A user with this username already exists!" };

        const hashedPW = await bcrypt.hash(password,16);

        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            gender: gender,
            city: city,
            state: state,
            age: age,
            password: hashedPW,
            preferences: preferences,
            userReviews: [],
            favorites: []
        }

        const newInsertInformation = await userCollection.insertOne(newUser);
        if (!newInsertInformation.insertedId) throw 'Insert failed!';
        else { return {userInserted: true};}
    },

    async checkUser(username, password) {
        validation.checkUserAndPassword(username, password);

        const userCollection = await users();
        username = username.toLowerCase();
        const user = await userCollection.findOne({username: username});

        if (!user) { throw "Username or password is invalid" };

        let hashedPW = user.password;
        let correctPW = false;
        try { correctPW = await bcrypt.compare(password, hashedPW); } catch(e) {}

        if (!correctPW) {throw "Username or password is invalid";}
        else {
            return {authenticated: true}; }
    },

    async findUserByName(username) {
        validation.checkUsername(username);
        const userCollection = await users();
        username = username.toLowerCase(); 
        const user = await userCollection.findOne({username: username}); 
        if (!user) { throw "Failed to find username" };
        return user;
    },

    async addToFavorite (username, businessName) {
        validation.checkUsername(username);
        validation.checkUsername(businessName);
        const userCollection = await users();
        username = username.toLowerCase(); 
        businessName = businessName.toLowerCase(); 
        const user = await userCollection.updateOne({username: username}, {$push:{favorites: businessName}}); 
        if (!user) { throw "Failed to add to favorites" };
        //const business = await 
    },

    async removeFromFavorite (username, businessName) { 
        validation.checkUsername(username);
        validation.checkUsername(businessName);
        const userCollection = await users();
        username = username.toLowerCase(); 
        businessName = businessName.toLowerCase(); 

        const user = await userCollection.updateOne({username: username}, {$pull:{favorites: businessName}}); 
        if (!user) { throw "Failed to remove from favorites" };
    },

    async getFavorites (username) {
        validation.checkUsername(username);
        const userCollection = await users();
        username = username.toLowerCase(); 

        const user = await userCollection.findOne({username: username}); 
        if (!user) { throw "Failed to find favorites" };
        let favorites = [];
        for (let i=0; i<user.favorites.length; i++) {
            if (user.favorites[i]) {
                const current = await businessData.findBusinessByName(user.favorites[i]);
                favorites.push(current[0]);
            }
        }
        return favorites;
    },

    async updateUserData(username, preferences) {
        validation.checkUsername(username);
        if (!preferences || preferences.length == 0) throw "Please select at least 1 preferences!"
        if (preferences.length>5) throw "Please select up to only 5 preferences!"
        const userCollection = await users();
        username = username.toLowerCase(); 
        const user = await userCollection.updateOne({username: username}, {$set:{preferences: preferences}}); 
        if (!user) { throw "Failed to update preferences" };
    }
};

    