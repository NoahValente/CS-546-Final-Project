const business = require('../business');
const users = require('../users');
const connection = require('../../config/mongoConnection');

const main = async () => {
    
    const db = await connection.dbConnection();
    await db.dropDatabase();

    /* find business by category & name tests */
    
    try {
        let worked = await business.createBusiness("Cavin", "Gada",  "cavingada", "cavingada@gmail.com", "Paramus", "NJ", "password",["Food", "Fitness", "Art"]);
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

    

    /* find business by id has been tested. I cannot write a test here since i would need to change 
    the return of createBusiness to return the business itself and not {inserted: true} object */
    
    await connection.closeConnection();
}

main();