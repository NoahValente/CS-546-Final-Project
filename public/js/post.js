(function ($) {

    
    let error = $('#errorClient');

    $(document).ready(function() {
        error.hide();
    })
    
    $('#post').on('submit', function(event){

        let postTitle = $('#postTitle').val();
        let postText = $('#postText').val();
        let postImage = $('#postImage').val();

        $('#error').hide();
        error.empty();
        error.hide();

        try{
            checkTextInput(postTitle, "post title");
            checkTextInput(postImage, "post image");
            checkTextInput(postText, "post"); 
        }
        catch(e){
            error.hide();
            event.preventDefault();
            $('#errorClient').append(e); 
            error.show();
        }
    })


    $('#editPost').on('submit', function(event){
        $('#error').hide();
        error.empty();
        error.hide();

        let newTitle = $('#newTitle').val();
        let newText = $('#newText').val();

        try{
            checkTextInput(newTitle, "post title");
            checkTextInput(newText, "post"); 
        }
        catch(e){
            error.hide();
            event.preventDefault();
            $('#errorClient').append(e); 
            error.show();
        }
    })

/*
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