(function ($) {

    let userType = $('#usertype').val();
    let preferences = $('#preferences').val();
    let error = $('#errorClient'); 
    $(document).ready(function loadPage(){ 
        $('#errorClient').empty();
        $('#errorClient').hide();
        $('#error').show();
        console.log(preferences); 
        console.log(userType);
    })

    $('#editForm').on('submit', function (event){
        
        $('#error').hide();
        error.empty();
        error.hide();
        
        let businessType = $('#businessType').val();
        let userType = $('#usertype').val();
        
        try{
            if (userType === "user"){
                
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

    })
    
})(window.jQuery);