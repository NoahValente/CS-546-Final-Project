const business = require('../business');
const users = require('../users');
const connection = require('../../config/mongoConnection');

const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    let user1;
    try {
        user1 = await users.createUser("Cavin", "Gada", "cavingada@gmail.com", "cavingada","Male", "Paramus", "NJ", 19, "cavingada", ["Art", "Music", "Clothing"]);
    } catch(e) {
        console.log(e);
    }

    try {
        user1 = await users.updateUserData("cavingada", ["Fashion", "Business"]);
    } catch(e) {
        console.log(e);
    }

    try {
        user1 = await users.findUserByName("cavingada");
        console.log(user1);
    }catch(e){
        console.log(e);
    }

    await connection.closeConnection();
}

main();