const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const businesses = mongoCollections.businesses;
const {ObjectId, ObjectID} = require('mongodb');
const validation = require('./validation');


module.exports = {
    async createNewPost(businessName, title, image, postText){
        validation.checkUsername(businessName);
        if (!title) throw "Please enter a title for the post!"
        if (!image) throw "Please enter image URL!"
        if(!postText) throw "Please enter text for the post!"
        if (typeof title,postText !== 'string') throw "Post must be a string!";

        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;

        let newPost = {
            businessId: businessName,
            title: title,
            date: date,
            image: image,
            postText: postText,
            postId: postId
        }

        // add to post database
        const postCollection = await reviews();
        const newInsertInformation = await reviewCollection.insertOne(newPost);
        if (!newInsertInformation.insertedId) throw 'Insert failed!';


        // add to businesses database
        const businessCollection = await businesses();
        businessName = businessName.toLowerCase();
        const business = await businessCollection.updateOne({username: businessName}, {$push:{userReviews: newInsertInformation.insertedId.toString()}}); 
        if (!business) throw "Internal database problem"
        
        return {postInserted: true};
        //return newInsertInformation; // use this return for testing.
    },

    async deletePost(businessName, PostID){
        validation.checkUsername(businessName);
        validation.checkId(PostID);
        const postCollection = await posts();
        const post = await postCollection.remove({_id: ObjectId(reviewID)});
        if (!post) { throw "Post does not exist" };

        const businessCollection = await businesses();
        businessName = businessName.toLowerCase(); 
        const businesses = await businessCollection.updateOne({businessName: businessName}, {$pull:{businessPost: PostID}}); 
    },

    async editPost(businessName, postID, title, image, postText){
        validation.checkUsername(businessName);
        validation.checkId(PostID);
        if (!title) throw "Please enter a title!"
        if(!image) throw "Please enter image URL!"
        if (!postText) throw "Please write something to post!"
        if (typeof title, image, postText !== 'string') throw "Post must be a string!";

        // just update the fields in the post database, id and business name all stay the same.
        const postCollection = await posts();
        const post = await postCollection.updateOne({_id: ObjectId(postID)}, {$set:{ title: title, postText:postText}});
        if (!post) { throw "Failed to update post" };
    },

    async getAllPostByBusiness(businessName){
        validation.checkUsername(businessName);
        const businessCollection = await businesses();
        businessName = businessName.toLowerCase(); 

        const business = await businessCollection.findOne({username: businessName}); 
        if (!business) throw "No business found"

        const postCollection = await posts();
        let post; // will keep track of current post
        let postList = []; // will store all the post for the business
        let businessPost = business.businessPost; // array of post Ids for the business. 

        for (let i = 0; i<businessPost.length; i++) {
            post = await reviewCollection.findOne({_id: ObjectId(userReviews[i])});
            if (post == null) continue;
            postList.push(post);
        }
        return postList;
    },

    async getPostById(id) {
        validation.checkId(id);
        const postCollection = await posts();
        const post = await postCollection.findOne({_id: ObjectId(id)});
        if (!post) throw "No post found!"
        return post;
    },

}
