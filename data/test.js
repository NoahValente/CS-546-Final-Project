const business = require('./business');
const users = require('./users');
const connection = require('../config/mongoConnection');

const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    let business1, business2;
    let user1, user2;

    /* FAVORITES TESTS*/
    try {
        let worked = await users.createUser("Cavin", "Gada", "cavingada@gmail.com", "cavingada","Male", "Paramus", "NJ", 19, "cavingada", ["Art", "Music", "Clothing"]);
    } catch(e) {
        console.log(e);
    }

    try {
        let added = await users.addToFavorite("cavingada", "NOAH");
    } catch(e) {
        console.log(e);
    }

    try {
        let added = await users.addToFavorite("cavingada", "Farnk Pirzza");
    } catch(e) {
        console.log(e);
    }

    try {
        let removed = await users.removeFromFavorite("cavingada", "NOAH");
    } catch(e) {
        console.log(e);
    }

    try {
        let favorites = await users.getFavorites("cavingada");
        console.log(favorites);
    } catch(e) {
        console.log(e);
    }
    
        /* find business tests*/
    try {
        let worked = await business.createBusiness("Cavin", "Gada", "cavingada", "cavingada@gmail.com", "Paramus", "NJ", "cavingada", ["Convenience", "Fitness", "Art"]);
    } catch(e) {
        console.log(e);
    }

    try {
        let worked = await business.createBusiness("Cavin", "Gada",  "cavingada@gmail.com", "SECONDBUS", "Paramus", "NJ", "cavingada", ["Food", "Fitness", "Art"]);
    } catch(e) {
        console.log(e);
    }

    try {
        let ans = await business.findBusinessByCategory("MONGO");
        console.log(ans);
    } catch(e) {
        console.log(e)
    }

    try {
        let ans = await business.findBusinessByCategory("Art");
        console.log(ans);
    } catch(e) {
        console.log(e)
    }

    try {
        let ans = await business.findBusinessByName("caviNgada");
        console.log(ans);
    } catch(e) {
        console.log(e)
    }
    

    await connection.closeConnection();
    await business.createBusiness("Cavin", "Gada", "cavingada@gmail.com", "cavingada", "Paramus", "NJ", "cavingada", ["Convenience", "Fitness", "Art"]);
}

main();