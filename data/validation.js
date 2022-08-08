const {ObjectId} = require('mongodb');
function validateString(s, type) {
    if (typeof s !== 'string') throw `${type} must be a string`;
    if (!s) {
        throw `${type} must not be empty`;
    }
    // regex coolness from here: https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
    // and here.. https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-letters-and-numbers#:~:text=Use%20the%20test()%20method,the%20string%20and%20false%20otherwise.
    if (/\s/.test(s)) { throw `${type} cannot have spaces!`}
    return s;
}

module.exports = {
    
    validateUserAndBusinessInput(firstName, lastName, email, username, city, state, password) {
        // check that the input are all valid strings
    
        username = validateString(username, "Username");
        // check that username is at least 4 characters and contains only alphanumeric values
        if (!(/^[A-Za-z0-9]*$/.test(username))) { throw `Username can only contain alpha-numeric characters!`}
        if (username.length < 4) throw `Username must be at least 4 characters long!`
    
        password = validateString(password, "Password");
        // check that password is at least 6 characters long
        if (password.length < 6) throw "Password must be at least 6 characters long!"
    
        firstName = validateString(firstName, "First name");
        lastName = validateString(lastName, "Last name");
    
        email = validateString(email, "Email");
        // check that email is of valid format
        // help from: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
        var validFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!(email.match(validFormat))) throw "Please enter a valid email address";
    
        city = validateString(city, "City");
        if (!state) throw "Please select a state" // no need to check rest since its dropdown. 
    
        // city should only be of letters
        if(!(/^[a-zA-Z]+$/.test(city))) throw "City should only consist of letters"
    }
}