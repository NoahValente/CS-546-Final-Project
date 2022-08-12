const business = require('./business');
const connection = require('../config/mongoConnection');

const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    let business1, business2;


    try {
        let worked = await business.createBusiness("Cavin", "Gada", "cavingada", "cavingada@gmail.com", "Paramus", "NJ", "cavingada", ["Convenience", "Fitness", "Art"]);
    } catch(e) {
        console.log(e);
    }

    try {
        let worked = await business.createBusiness("Cavin", "Gada", "SECONDBUS", "cavingada@gmail.com", "Paramus", "NJ", "cavingada", ["Food", "Fitness", "Art"]);
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

}

main();