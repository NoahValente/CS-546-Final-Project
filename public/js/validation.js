

function validateString(s, type) {
    if (typeof s !== 'string') throw `${type} must be a string`;
    if (!s) {
        throw `${type} must not be empty`;
    }
    // regex coolness from here: https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
    // and here.. https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-letters-and-numbers#:~:text=Use%20the%20test()%20method,the%20string%20and%20false%20otherwise.
    if (type != "City" && /\s/.test(s)) throw `${type} cannot have spaces!`;
    return s;
}

    
function checkUsername(username) {
    username = validateString(username, "Username");
    if (!(/^[A-Za-z0-9]*$/.test(username))) { throw `Username is not valid.`}''
    if (username.length < 4) throw `Username is not valid.`;
}


function checkUserAndPassword(username, password) {
    username = validateString(username, "Username");
    // check that username is at least 4 characters and contains only alphanumeric values
    if (!(/^[A-Za-z0-9]*$/.test(username))) { throw `Username can only contain alpha-numeric characters!`}
    if (username.length < 4) throw `Username must be at least 4 characters long!`

    password = validateString(password, "Password");
    // check that password is at least 6 characters long
    if (password.length < 6) throw "Password must be at least 6 characters long!"
}

function checkEmail(email){
    email = validateString(email, "Email");
    // check that email is of valid format
    // help from: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    var validFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!(email.match(validFormat))) throw "Please enter a valid email address";
}

function checkCity (city){
    city = validateString(city, "City");
    // city should only be of letters
    if(!(/^[a-zA-Z]+$/.test(city.replace(/\s/g, "")))) throw "City should only consist of letters"
}

function checkState (state){
    if (!state || state === "none") throw "Please select a state" // no need to check rest since its dropdown. 
}

function checkAge (age){
    if (!age){
        throw 'Please type in your age';
    }
}

function checkGender (gender){
    if (!gender || gender === "none"){
        throw "Please select one gender";
    }
}

function checkPreferences (preferences){
    if (!preferences || $('#preferences').val().length < 1 || $('#preferences').val().length > 5){
        throw "Please select between 1-5 preferences";
    }
}

function checkBusinessType (businessType){
    if (!businessType || $('#businessType').val().length < 1 || $('#businessType').val().length > 5){
        throw "Please select between 1-5 business genres"
    }
}

function checkExploreCategory (category){
    
    if (!category || category === "none"){
        
        throw "Please select a category";
    }
}

function checkReview (review){
    
    if (!review)  throw `Please provide some review text`
    if (typeof review !== 'string') throw `Review must not be empty`
    if (review.trim().length === 0) throw `Review must be not be empty`

}

function checkTextInput (text, textName){
    
    if (!text)  throw `Please provide some ${textName} text`
    if (typeof text !== 'string') throw `${textName} must be not be empty`
    if (text.trim().length === 0) throw `${textName} must be not be empty`

}

function checkRatingRange(ratingRange){
    if (!ratingRange) throw "Please select a rating from 1-10!"
}

function validateUserAndBusinessInput(firstName, lastName, email, username, city, state, password) {
    // check that the input are all valid string
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
    if(!(/^[a-zA-Z]+$/.test(city.replace(/\s/g, "")))) throw "City should only consist of letters"
}


function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0)
    throw 'Error: id cannot be an empty string or just spaces';
}
