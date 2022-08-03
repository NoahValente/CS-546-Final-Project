const {ObjectId} = require('mongodb');

module.exports = {
    checkUsername(strVal){
        if (!strVal) throw `Error: You must supply a username!`;
        if (typeof strVal !== 'string') throw `Error: username must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0){
            throw `Error: username cannot be an empty string or string with just spaces`;
        }
        if (strVal.length < 4 || !/^[a-zA-Z0-9]*$/.test(strVal) || strVal.length > 21) {
            throw 'Username must be alphanumeric and be 4 to 21 characters long with no spaces.';
        }
        strVal = strVal.toLowerCase();
        return strVal; 
    }, 

    checkBusinessname(strVal){
        if (!strVal) throw `Error: You must supply a business name!`;
        if (typeof strVal !== 'string') throw `Error: business name must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0){
            throw `Error: business name cannot be an empty string or string with just spaces`;
        }
        if (strVal.length < 4 || !/^[ A-Za-z0-9_@./#&+-]*$/.test(strVal) || strVal.length > 21) {
            throw 'Business name must be alphanumeric and be 4 to 21 characters long with no spaces.';
        }
        return strVal;
    }, 

    checkPassword(strVal){
        if (!strVal) throw `Error: You must supply a password!`;
        if (typeof strVal !== 'string') throw `Error: password must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0){
            throw `Error: password cannot be an empty string or string with just spaces`;
        }
        if (password.length < 6 || /\s/.test(password)) {
            throw 'Password must be at least 6 characters long with no spaces.';
        }
        return strVal;
    }, 

    checkText(strVal, strName){
        if (!strVal) throw `Error: You must supply a ${strName}!`;
        if (typeof strVal !== 'string') throw `Error: ${strName} must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0){
            throw `Error: ${strName} cannot be an empty string or string with just spaces`;
        }
        return strVal; 
    },

    checkNumber(numVal, numName){

        if (!numVal) throw `Error: You must supply a number!`;
        if (typeof numVal !== 'number') throw `Error: ${numName} must be a number!`;
        if (isNaN(numVal)) throw `Error: ${numName} must be a number!`;

        return numVal;
    }
}