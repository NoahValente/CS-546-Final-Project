/*// there will be a dropdown on sign-up page that changes between user/business sign-up forms

//import validation from "../../data/validation";

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
//import validation from '../../data/validation.js';
// upon dropdown change, the page will render different questions needed to sign-up for different accounts
(function ($) {
    //const validation = require('../../data/validation');
    const error = $('#errorClient');
    const dropdown =  document.getElementById('userType');
    const form = document.getElementById('signupForm');
    const heading = document.getElementById('formHeading');
    const userFields = document.getElementsByClassName('userFields');
    const businessFields = document.getElementsByClassName('businessFields');
    


    dropdown.addEventListener('change', function() {
        error.hide();
        if (this.value === "User") {
            form.hidden = false;
            form.setAttribute("action", "/signup/user");
            heading.innerHTML = "User Sign Up";
            for(field of userFields) {
                field.hidden = false;
                field.disabled = false;
            }
            for(field of businessFields) {
                field.hidden = true;
                field.disabled = true;
            }
        } else if (this.value === "Business") {
            form.hidden =false;
            form.setAttribute("action", "/signup/business");
            heading.innerHTML = "Business Sign Up";
            for(field of userFields) {
                field.hidden = true;
                field.disabled = true;
            }
            for(field of businessFields) {
                field.hidden = false;
                field.disabled = false;
            }
        } else {
            form.hidden = true;
        }
    })
    $(document).ready(function() {
        $('#error').hide();

        error.hide();
        // On refresh check if there are values selected
        if (localStorage.userType) {
                // Select the value stored
            $('#userType').val( localStorage.userType );
            $('#userType').val('none').attr('selected', false);
            $('#userType').val('User').attr('selected', false);
            $('#userType').val('Business').attr('selected', false);
            
            $('#userType').val(localStorage.userType).attr('selected', true);
        }
        if (localStorage.gender) {
            // Select the value stored
        $('#gender').val( localStorage.gender );
        $('#gender').val(localStorage.gender).attr('selected', true);
        }
        if (localStorage.state) {
            // Select the value stored
        $('#state').val( localStorage.state);
        $('#state').val(localStorage.state).attr('selected', true);
        }
        if (dropdown.value === "User") {
            form.hidden = false;
            form.setAttribute("action", "/signup/user");
            heading.innerHTML = "User Sign Up";
            for(field of userFields) {
                field.hidden = false;
                field.disabled = false;
            }
            for(field of businessFields) {
                field.hidden = true;
                field.disabled = true;
            }
        } else if (dropdown.value === "Business") {
            form.hidden =false;
            form.setAttribute("action", "/signup/business");
            heading.innerHTML = "Business Sign Up";
            for(field of userFields) {
                field.hidden = true;
                field.disabled = true;
            }
            for(field of businessFields) {
                field.hidden = false;
                field.disabled = false;
            }
        } else {
            form.hidden = true;
        }
    });
    
    // On change store the value
    $('#userType').on('change', function(){
        error.hide();
        var currentVal = $(this).val();
        localStorage.setItem('userType', currentVal );
    });

    $('#gender').on('change', function(){
        error.hide();
        var currentVal = $(this).val();
        localStorage.setItem('gender', currentVal );
    });
    $('#state').on('change', function(){
        error.hide();
        var currentVal = $(this).val();
        localStorage.setItem('state', currentVal );
    });

    

    $('#signupForm').on('submit', function(event){
        
        //event.preventDefault();
        $('#error').hide();
        error.empty();
        error.hide();
        let username = $('#username').val();
        let password = $('#password').val();
        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let email = $('#email').val();
        let city = $('#city').val();
        let age = $('#age').val();
        let gender = $('#gender').val();
        let state = $('#state').val();
        let preferences = $('#preferences').val();
        let businessType = $('#businessType').val();

        try{
            validateString(username, 'Username');
            if (!(/^[A-Za-z0-9]*$/.test(username))) { throw `Username can only contain alpha-numeric characters!`}
            if (username.length < 4) { throw `Username must be at least 4 characters long!`}
            validateString(password, 'Password');
            if (password.length < 6) {throw "Password must be at least 6 characters long!"}
            validateString(firstName, "First name");
            validateString(lastName, "Last name");
            validateString(email, "Email");
            var validFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!(email.match(validFormat))) throw "Please enter a valid email address";

            var city1 = validateString(city, "City");
            if (!state) throw "Please select a state" // no need to check rest since its dropdown. 
        
            // city should only be of letters
            if(!(/^[a-zA-Z]+$/.test(city1.replace(/\s/g, "")))) throw "City should only consist of letters"
            if (!age){
                throw 'Please type in your age';
            }
            
            if (!gender){
                throw "Please select one gender";
            }
            if (!state){
                throw "Please select one state";
            }
    
            if (dropdown.value === "User"){
                if (!preferences){
                    throw "Please select between 1-5 preferences only";
                }
                /*if (!preferences || $('#preferences option').length < 1 || $('#preferences option').length > 5){
                    throw "Please select between 1-5 preferences only.";
                }
            }
            else{
                if (!businessType || $('#business option').length < 1 || $('#business option').length > 5){
                    throw "Please select between 1-5 business genres only."
                }
            }
        }
        catch(e){
            $('#errorClient').append(e); 
        }
        

        
        error.show();
        /*
        let urlVal = "";
        if (dropdown.value === "User"){
            urlVal = 'http://localhost:3000/signup/user';
        }
        else if (dropdown.value === "Business"){
            urlVal = 'http://localhost:3000/signup/business';
        }

        var requestConfig = {
            method: 'POST',
            url: urlVal,
            contentType: 'application/json',
            data: JSON.stringify({
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                username: username,
                gender: gender, 
                city: city,
                state: state,
                age: age,
                password: password,
                preferences: preferences

            })
        };
        $.ajax(requestConfig); 
        //validation.validateUserAndBusinessInput(firstName, lastName, email, username, city, state, password);
        
    });
    




})(window.jQuery);
*/
// there will be a dropdown on sign-up page that changes between user/business sign-up forms
// upon dropdown change, the page will render different questions needed to sign-up for different accounts

(function ($) {
    const dropdown =  document.getElementById('userType');
    const form = document.getElementById('signupForm');
    const heading = document.getElementById('formHeading');
    const userFields = document.getElementsByClassName('userFields');
    const businessFields = document.getElementsByClassName('businessFields');
    
    dropdown.addEventListener('change', function() {
        if (this.value === "User") {
            form.hidden = false;
            form.setAttribute("action", "/signup/user");
            heading.innerHTML = "User Sign Up";
            for(field of userFields) {
                field.hidden = false;
                field.disabled = false;
            }
            for(field of businessFields) {
                field.hidden = true;
                field.disabled = true;
            }
        } else if (this.value === "Business") {
            form.hidden =false;
            form.setAttribute("action", "/signup/business");
            heading.innerHTML = "Business Sign Up";
            for(field of userFields) {
                field.hidden = true;
                field.disabled = true;
            }
            for(field of businessFields) {
                field.hidden = false;
                field.disabled = false;
            }
        } else {
            form.hidden = true;
        }
    })
    $(document).ready(function() {
        // On refresh check if there are values selected
        if (localStorage.userType) {
                // Select the value stored
            $('#userType').val( localStorage.userType );
            $('#userType').val('none').attr('selected', false);
            $('#userType').val('User').attr('selected', false);
            $('#userType').val('Business').attr('selected', false);
            
            $('#userType').val(localStorage.userType).attr('selected', true);
        }
        if (localStorage.gender) {
            // Select the value stored
        $('#gender').val( localStorage.gender );
        $('#gender').val(localStorage.gender).attr('selected', true);
        }
        if (localStorage.state) {
            // Select the value stored
        $('#state').val( localStorage.state);
        $('#state').val(localStorage.state).attr('selected', true);
        }
        if (dropdown.value === "User") {
            form.hidden = false;
            form.setAttribute("action", "/signup/user");
            heading.innerHTML = "User Sign Up";
            for(field of userFields) {
                field.hidden = false;
                field.disabled = false;
            }
            for(field of businessFields) {
                field.hidden = true;
                field.disabled = true;
            }
        } else if (dropdown.value === "Business") {
            form.hidden =false;
            form.setAttribute("action", "/signup/business");
            heading.innerHTML = "Business Sign Up";
            for(field of userFields) {
                field.hidden = true;
                field.disabled = true;
            }
            for(field of businessFields) {
                field.hidden = false;
                field.disabled = false;
            }
        } else {
            form.hidden = true;
        }
    });
    
    // On change store the value
    $('#userType').on('change', function(){
        var currentVal = $(this).val();
        localStorage.setItem('userType', currentVal );
    });

    $('#gender').on('change', function(){
        var currentVal = $(this).val();
        localStorage.setItem('gender', currentVal );
    });
    $('#state').on('change', function(){
        var currentVal = $(this).val();
        localStorage.setItem('state', currentVal );
    });
    
})(window.jQuery);
  