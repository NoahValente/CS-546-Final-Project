(function ($) {

var ratingRange = document.getElementById("ratingRange");
var ratingValue = document.getElementById("ratingValue");
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

    try{
        console.log(reviewText); 
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