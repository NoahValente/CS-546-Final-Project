(function ($) {
    var searchType = $('#searchType'),
    searchByName = $('#searchByName'), 
    searchByCategory = $('#searchByCategory')

    $(document).ready(function loadPage(){ 
        $('#errorClient').hide();
        $('#errorClient').empty();
        $('#resultList').hide();
        $('#searchByName').hide();
        $('#searchByCategory').hide();
    })

$('#searchType').on('change', function(){
   
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
    let name = $('#typedName').val();

    if (!name){
        $('#errorClient').append("Please enter a business name!");
    }
    else if (name.trim().length === 0){
        $('#errorClient').append("Please enter a business name, not just spaces!");
    }
    else{
        var requestConfig = {
            method: 'POST',
            url: 'http://localhost:3000/explore/search',
            contentType: 'application/json',
            data: JSON.stringify({
                name: name
            })
        };
    
        $.ajax(requestConfig).then(function(responseMessage){

            if (!Array.isArray(responseMessage)){
                $('#errorClient').append(responseMessage);
            }
            else{
                for (let eachName of responseMessage){
                    let link =  $(`<li></li>`).append($(`<a href= http://localhost:3000/business/${eachName._id}></a>`).text(`${eachName.username}`));
                    $('#resultList').append(link); 
                }
            }  
        })
    }
    
    $('#errorClient').show();
    $('#resultList').show();
    $('#typedName').val('');
})

$('#categoryName').on('change', function(){

    $('#resultList').empty();
    $('#resultList').hide();
    $('#errorClient').hide();
    $('#errorClient').empty();

    let category = $('#categoryName').val();

    if (!category || $('#category option').length === 0){
        $('#errorClient').append("Please select a category!");
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
            $('#errorClient').append(responseMessage);
        }
        else{
            for (let eachName of responseMessage){

                let link =  $(`<li></li>`).append($(`<a href= http://localhost:3000/business/${eachName._id}></a>`).text(`${eachName.username}`));
                $('#resultList').append(link); 
            }
        }
    })
    $('#errorClient').show();
    $('#resultList').show();
})

})(window.jQuery);