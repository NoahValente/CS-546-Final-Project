const businessData = require('./business');
const postData = require('./posts');
const reviewData = require('./reviews');
const userData = require('./users');
const validations = require('./validation'); 

module.exports = {
  business: businessData,
  posts: postData,
  reviews: reviewData,
  users: userData,
  validation: validations
};
