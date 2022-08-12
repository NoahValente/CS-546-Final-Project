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
  