(function ($) {

var ratingRange = document.getElementById("ratingRange");
var ratingValue = document.getElementById("ratingValue");
ratingValue.innerHTML = ratingRange.value;

ratingRange.oninput = function() {
    ratingValue.innerHTML = this.value;
}

})(window.jQuery);