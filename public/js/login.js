(function () {

    $(document).ready(function() {
        // On refresh check if there are values selected
        if (localStorage.userType) {
                // Select the value stored
            $('#userType').val( localStorage.userType );
        }
    });
    
    // On change store the value
    $('#userType').on('change', function(){
        var currentVal = $(this).val();
        localStorage.setItem('userType', currentVal );
    });
} ) ();