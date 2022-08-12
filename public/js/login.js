(function () {

    $(document).ready(function() {
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
} ) (window.jQuery);