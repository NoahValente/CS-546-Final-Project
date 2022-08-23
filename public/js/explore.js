(function ($) {
    var searchType = $('#searchType'),
    searchByName = $('#searchByName'), 
    searchByCategory = $('#searchByCategory'),
    searchByState = $('#searchByState');
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
            $('#searchByState').hide();
            $('#searchByName').show();
        }
        else if ((searchType).val() === "businessType"){
            searchByName.hide();
            searchByState.hide();
            searchByCategory.show();
        } else {
            searchByName.hide();
            searchByState.show();
            searchByCategory.hide();
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

    /*$('#resultList').empty();
    $('#resultList').hide();
    $('#error').hide();
    $('#error').empty();*/

    $('#resultList').empty();
    $('#resultList').hide();
    $('#errorClient').hide();
    $('#errorClient').empty();

    let category = $('#categoryName').val();

    try{
        checkExploreCategory(category);
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
                $('#errorClient').append(responseMessage);
                $('#errorClient').show();
            }
            else{
                for (let eachName of responseMessage){
    
                    let link =  $(`<li></li>`).append($(`<a href= http://localhost:3000/business/${eachName._id}></a>`).text(`${eachName.username}`));
                    $('#resultList').append(link); 
                }
            }
        })
        //$('#error').show();
        $('#resultList').show();
    }
    catch(e){
        $('#errorClient').append(e);
        $('#errorClient').show();
    }
   
})

$('#stateName').on('change', function(){


    $('#resultList').empty();
    $('#resultList').hide();
    $('#errorClient').hide();
    $('#errorClient').empty();

    let state = $('#stateName').val();

    try{
        checkState(state);
        var requestConfig = {
            method: 'POST',
            url: 'http://localhost:3000/explore/state',
            contentType: 'application/json',
            data: JSON.stringify({
                state: state
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
        })
        //$('#error').show();
        $('#resultList').show();
    }
    catch(e){
        $('#errorClient').append(e);
        $('#errorClient').show();
    }
   
})

})(window.jQuery);