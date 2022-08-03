// there will be a dropdown on sign-up page that changes between user/business sign-up forms
// upon dropdown change, the page will render different questions needed to sign-up for different accounts

// document.getElementById(idthing).value === user
// hide the business form
// show the user form

// document.getElementById(idthing).value === business
// show the business form
// hide the user form

(function () {
    const dropdown =  document.getElementById('userType');
    const userForm = document.getElementById('userSignup');
    const businessForm = document.getElementById('businessSignup');
    dropdown.addEventListener('change', function() {
        if (this.value === "User") {
            userForm.hidden = false;
            businessForm.hidden = true;
        } else if (this.value === "Business") {
            userForm.hidden = true;
            businessForm.hidden = false;
        } else {
            userForm.hidden = true;
            businessForm.hidden = true;
        }
    });
  })();
  