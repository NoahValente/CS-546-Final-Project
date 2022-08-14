//using jquery

(function ($) {
    var searchTypeOption = $('#searchTypeOption'),
    searchType = $('#searchType'),
    searchByName = $('#searchByName'), 
    searchByCategory = $('#searchByCategory'),
    resultList = $('#resultList'),
    favBiz = $('#favBiz')
//TODO: when you refresh, maybe make the form default again, and load the initial setup

$('#searchType').on('change', function(){
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
    //TODO: What if after everything loads, you click on the select again
    //TODO: IF U TYPE SM INCORRECT, THEN U SHOULD HANDLE IT?
    event.preventDefault();
    let name = $('#typedName').val();

    if (!name){
        alert("Please enter a business name!")
    }
    else if (name.trim().length === 0){
        alert("Please enter a business name, not just spaces!");
    }
    else{
        $('#resultList').empty();
        var requestConfig = {
            method: 'POST',
            url: 'http://localhost:3000/explore/' + name
                //url: `http://api.tvmaze.com/search/shows?q=${value}`
        };
    
        //console.log(`http://localhost:3000/explore/' + ${name}`)
        
        
        $.ajax(requestConfig).then(function(responseMessage){
            //console.log(responseMessage);
            if (!Array.isArray(responseMessage)){
                alert(responseMessage);
            }
            else{
                for (let eachName of responseMessage){
                
                    //console.log(eachName._id);
                    //console.log(eachName._id.toString())
                    let link =  $(`<li></li>`).append($(`<a href= http://localhost:3000/business/${eachName._id}></a>`).text(`${eachName.username}`));
                    //let link = $(`<li><a href="${eachShow._links.self.href}">${eachShow.name}</a></li>`) 
                    $('#resultList').append(link); 
                }
            }
            
        })
    }
    
    
    $('#resultList').show();
    $('#typedName').val('');
    //console.log(name);
    //searchByName.hide();*/
    //$('#resultList').empty();
    //$('#resultList').show();
   //$('#typedName').val('');
})

$('#categoryName').on('change', function(){
    let category = $('#categoryName').val()
    $('#resultList').empty();
    $('#resultList').empty();
    var requestConfig = {
        method: 'POST',
        url: 'http://localhost:3000/explore/' + category
                //url: `http://api.tvmaze.com/search/shows?q=${value}`
    };
    $.ajax(requestConfig).then(function(responseMessage){
        if (!Array.isArray(responseMessage)){
            alert(responseMessage);
        }
        else{
            for (let eachName of responseMessage){
                
                //console.log(eachName._id);
                //console.log(eachName._id.toString())
                let link =  $(`<li></li>`).append($(`<a href= http://localhost:3000/business/${eachName._id}></a>`).text(`${eachName.username}`));
                //let link = $(`<li><a href="${eachShow._links.self.href}">${eachShow.name}</a></li>`) 
                $('#resultList').append(link); 
            }
        }
    })

    $('#resultList').show();

})

})(window.jQuery);