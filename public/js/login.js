(function () {

    
    const error = $('#errorClient');

    $(document).ready(function() {
        error.hide();
        if (localStorage.userType) {
            // Select the value stored
        $('#userType').val( localStorage.userType );
        $('#userType').val(localStorage.userType).attr('selected', true);
    }
    });
    
    // On change store the value

    $('#userType').on('change', function(){
        var currentVal = $(this).val();
        localStorage.setItem('userType', currentVal );
    });

    $('#loginForm').on('submit', function(event){

        $('#error').hide();
        error.empty();
        error.hide();
        
        let username = $('#username').val();
        let password = $('#password').val();

        try{
           checkUserAndPassword(username, password);
        }
        catch(e){
            error.hide();
            event.preventDefault();
            $('#errorClient').append(e); 
            error.show();
        }
    })
} ) (window.jQuery);