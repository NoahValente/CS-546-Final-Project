(function ($) {


    $('#id').on('submit', function(event){
        let postTitle = $('#postTitle').val();
        let postText = $('#postText').val();
        let postImage = $('#postImage').val();
        console.log(postImage); 
    })
    //var postImage = $('#postImage');
    /*var uploadedImage = "";
    const postImage = $('#postImage');
    postImage.on('change', function(event){
        //idea taken from youtube: codefoxx: JavaScript - How to Upload and Display Images
        const reader = new FileReader();
        reader.addEventListener('load', () =>{
            uploadedImage = reader.result;
            console.log(`url(${uploadedImage})`); 
        })
        reader.readAsDataURL(this.files[0]);
    })*/
})(window.jQuery);