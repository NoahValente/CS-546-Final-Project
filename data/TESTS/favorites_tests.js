const business = require('../business');
const users = require('../users');
const connection = require('../../config/mongoConnection');

const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    /* FAVORITES TESTS*/

    let user1;

    try {
        user1 = await users.createUser("Cavin", "Gada", "cavingada@gmail.com", "cavingada","Male", "Paramus", "NJ", 19, "cavingada", ["Art", "Music", "Clothing"]);
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

    await connection.closeConnection();
}

main();