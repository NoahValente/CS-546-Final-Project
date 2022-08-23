(function ($) {

let ratingRange = document.getElementById("ratingRange");
let ratingValue = document.getElementById("ratingValue");
const error = $('#errorClient');
ratingValue.innerHTML = ratingRange.value;

ratingRange.oninput = function() {
ratingValue.innerHTML = this.value;
}

$(document).ready(function() {
    error.hide();
})

$('#review').on('submit', function(event){
    $('#error').hide();
    error.empty();
    error.hide();

    let reviewText = $('#reviewText').val();
    let ratingRange = $('#ratingRange').val();
    console.log(ratingRange);
    try{
        checkRatingRange(ratingRange);
        checkReview(reviewText); 
    }
    catch(e){
        error.hide();
        event.preventDefault();
        $('#errorClient').append(e);
        $('#errorClient').show();
    } 
})

})(window.jQuery);