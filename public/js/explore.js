(function ($) {
    var searchType = $('#searchType'),
    searchByName = $('#searchByName'), 
    searchByCategory = $('#searchByCategory'),
    error = $('#errorClient')

    $(document).ready(function loadPage(){ 

        $('#errorClient').empty();
        $('#errorClient').hide();
        $('#error').show();
    })

    $('#searchType').on('change', function(){

        error.hide();
        $('#error').hide();

        $('#resultList').empty();
        $('#resultList').hide();
        $('#errorClient').hide();
        $('#errorClient').empty();


        if ((searchType).val() === "name"){
            
            $('#searchByCategory').hide();
            $('#searchByName').show();
        }
        else{
            searchByName.hide();
            searchByCategory.show();
        }
    });

$('#submit').on('click', function(event){

    event.preventDefault();
    $('#resultList').empty();
    $('#resultList').hide();
    $('#errorClient').hide();
    $('#errorClient').empty();
    let businessName = $('#businessName').val();

    try{
        validateString(businessName, 'business name');
        var requestConfig = {
            method: 'POST',
            url: 'http://localhost:3000/explore/search',
            contentType: 'application/json',
            data: JSON.stringify({
                businessName: businessName
            })
        };

        $.ajax(requestConfig).then(function(responseMessage){

            if (!Array.isArray(responseMessage)){
                $('#errorClient').append(responseMessage);
                $('#errorClient').show();
            }
            else{
                for (let eachName of responseMessage){
                    let link =  $(`<li></li>`).append($(`<a href= http://localhost:3000/business/${eachName._id}></a>`).text(`${eachName.username}`));
                    $('#resultList').append(link); 
                }
            } 
            $('#resultList').show(); 
            $('businessName').val('');

        })
        
    }
    catch(e){
        $('#errorClient').append(e);
        $('#errorClient').show();
    }
})



$('#categoryName').on('change', function(){

    $('#resultList').empty();
    $('#resultList').hide();
    $('#error').hide();
    $('#error').empty();

    let category = $('#categoryName').val();

    try{
        checkExploreCategory(category);
    }
    catch(e){
        $('#errorClient').append(e);
    }

    var requestConfig = {
        method: 'POST',
        url: 'http://localhost:3000/explore/browse',
        contentType: 'application/json',
        data: JSON.stringify({
            category: category
        })
    };

    $.ajax(requestConfig).then(function(responseMessage){
        if (!Array.isArray(responseMessage)){
            $('#error').append(responseMessage);
        }
        else{
            for (let eachName of responseMessage){

                let link =  $(`<li></li>`).append($(`<a href= http://localhost:3000/business/${eachName._id}></a>`).text(`${eachName.username}`));
                $('#resultList').append(link); 
            }
        }
    })
    $('#error').show();
    $('#resultList').show();
})

})(window.jQuery);