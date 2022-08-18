const mongoCollections = require('../config/mongoCollections');
const post = mongoCollections.posts;
const businesses = mongoCollections.businesses;
const {ObjectId, ObjectID} = require('mongodb');
const validation = require('./validation');


module.exports = {
    async createpost(businessName, title, date, image, postText){
        if (!title) throw "Please enter a title for the post!"
        if(!date) throw "Please enter a date!"
        if (!image) throw "Please enter image URL!"
        if(!postText) throw "Please enter text for the post!"
        if (typeof title,date,postText !== 'string') throw "Post must be a string!";

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

    async deletePosts(businessName, PostID){
        const postCollection = await posts();
        const post = await reviewCollection.remove({_id: ObjectId(reviewID)});
        if (!post) { throw "Post does not exist" };

        const businessCollection = await businesses();
        businessName = businessName.toLowerCase(); 
        const businesses = await businessCollection.updateOne({businessName: businessName}, {$pull:{businessPost: PostID}}); 
    },

    async editPosts(businessName, postID, title, date, image, postText){
        if (!title) throw "Please enter a title!"
        if(!date) throw "Please enter a date!"
        if(!image) throw "Please enter image URL!"
        if (!postText) throw "Please write something to post!"
        if (typeof title, date, image, postText !== 'string') throw "Post must be a string!";

        // just update the fields in the post database, id and business name all stay the same.
        const postCollection = await post();
        const post = await postCollection.updateOne({_id: ObjectId(postID)}, {$set:{ title: title, postText:postText}});
        if (!review) { throw "Review does not exist" };
    },

    async getPostByBusinessName(businessName){
        const businessCollection = await businesses();
        businessName = businessName.toLowerCase(); 

        const business = await businessCollection.findOne({username: businessName}); 
        if (!business) throw "No business found"

        const postCollection = await post();
        let post; // will keep track of current post
        let postList = []; // will store all the post for the business
        let businessPost = business.businessPost; // array of post Ids for the business. 

        for (let i = 0; i<businessPost.length; i++) {
            post = await reviewCollection.findOne({_id: ObjectId(userReviews[i])});
            if (post == null) continue;
            postList.push(post);
        }
        return postList;
    }

}
