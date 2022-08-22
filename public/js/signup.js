<<<<<<< HEAD
(function ($) {

    const error = $('#errorClient');
=======
// there will be a dropdown on sign-up page that changes between user/business sign-up forms
// upon dropdown change, the page will render different questions needed to sign-up for different accounts

(function ($) {
>>>>>>> a5d6b2ddc14cf352ab4cb79159b2e143913d5acc
    const dropdown =  document.getElementById('userType');
    const form = document.getElementById('signupForm');
    const heading = document.getElementById('formHeading');
    const userFields = document.getElementsByClassName('userFields');
    const businessFields = document.getElementsByClassName('businessFields');
<<<<<<< HEAD

    dropdown.addEventListener('change', function() {
        error.hide();
        $('#error').hide();
=======
    
    dropdown.addEventListener('change', function() {
>>>>>>> a5d6b2ddc14cf352ab4cb79159b2e143913d5acc
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
<<<<<<< HEAD
        
        error.hide();
=======
>>>>>>> a5d6b2ddc14cf352ab4cb79159b2e143913d5acc
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
<<<<<<< HEAD
        //error.hide();
=======
>>>>>>> a5d6b2ddc14cf352ab4cb79159b2e143913d5acc
        var currentVal = $(this).val();
        localStorage.setItem('userType', currentVal );
    });

    $('#gender').on('change', function(){
<<<<<<< HEAD
        //error.hide();
=======
>>>>>>> a5d6b2ddc14cf352ab4cb79159b2e143913d5acc
        var currentVal = $(this).val();
        localStorage.setItem('gender', currentVal );
    });
    $('#state').on('change', function(){
<<<<<<< HEAD
        //error.hide();
        var currentVal = $(this).val();
        localStorage.setItem('state', currentVal );
    });

    

    $('#signupForm').on('submit', function(event){
        
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
            checkUserAndPassword(username, password); 
            validateString(firstName, "First name");
            validateString(lastName, "Last name");
            checkEmail(email);
            checkState(state);
            checkCity(city);

            if (dropdown.value === 'User'){
                checkAge(age);
                checkGender(gender);
                checkPreferences(preferences);
            }

            else{
                checkBusinessType(businessType);
            }
        }
        catch(e){
            error.hide();
            event.preventDefault();
            $('#errorClient').append(e); 
            error.show();
            
        }  
    });
=======
        var currentVal = $(this).val();
        localStorage.setItem('state', currentVal );
    });
>>>>>>> a5d6b2ddc14cf352ab4cb79159b2e143913d5acc
    
})(window.jQuery);
  