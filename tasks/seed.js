const connection = require('../config/mongoConnection');
const data = require("../data");
const users = data.users;
const business = data.business;
const posts = data.posts;
const reviews = data.reviews;

const main = async () => {
    /* start connection */
    const db = await connection.dbConnection();
    await db.dropDatabase();

    /* populate users */
    let user1, user2;

    user1 = await users.createUser("Cavin", "Gada", "cavingada@gmail.com", "cavingada","Male", "Paramus", "NJ", 19, "cavingada", ["Art", "Music", "Clothing"]);
    user2 = await users.createUser("Don", "Joe", "djoe@gmail.com", "donjoe23","Female", "Oakland", "CA", 32, "applebanana15", ["Convenience", "Appearance", "Sports", "Food"]);

    /* populate businesses */
    let b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12;

    b1 = await business.createBusiness("Saul", "Goodman",  "saulAgencies", "sgoodman@gmail.com", "Hoboken", "NJ", "saulagencies",["Freelancing"]);
    b2 = await business.createBusiness("Frank", "DiGornio",  "Napolis", "napolisPizza@gmail.com", "Hoboken", "NJ", "napolispizza",["Food"]);
    b3 = await business.createBusiness("John", "Birno",  "Johnstheatre", "johntheater@gmail.com", "Hoboken", "NJ", "johntheatre",["Entertainment & Media"]);
    b4 = await business.createBusiness("Rocky", "Road",  "LittleRockGym", "littlerockgym@gmail.com", "Hoboken", "NJ", "rockrocks123",["Fitness", "Sports"]);
    b5 = await business.createBusiness("Abraham", "Lincoln",  "711store", "711hoboken@gmail.com", "Hoboken", "NJ", "711rocks",["Convenience", "Food"]);
    b6 = await business.createBusiness("Lemon", "Ade",  "LemonArtStudios", "lemonart@gmail.com", "Hoboken", "NJ", "lemonart125",["Art"]);
    b7 = await business.createBusiness("Gary", "Vee",  "Garystechstore", "garytech@gmail.com", "Hoboken", "NJ", "garystech11",["Technology"]);
    b8 = await business.createBusiness("Jane", "Holly",  "AnimalMakeover", "janeholly@gmail.com", "Hoboken", "NJ", "janesholly223",["Appearance", "Animals"]);
    b9 = await business.createBusiness("Raul", "Sauls",  "DigitalStudios", "digitalstudios@gmail.com", "Hoboken", "NJ", "digitalisbest112",["Entertainment & Media", "Technology", "Art"]);
    b10 = await business.createBusiness("Annie", "Goodman",  "DogFitness", "dogsshouldbefit@gmail.com", "Hoboken", "NJ", "dogsfit112",["Animals", "Fitness"]);
    b11 = await business.createBusiness("Rank", "Dook",  "waxandrelax", "waxandrelax@gmail.com", "Hoboken", "NJ", "waxrelax002",["Appearance", "Freelancing"]);
    b12 = await business.createBusiness("Lolert", "Bobbypin",  "eatanddraw", "eatanddraw@gmail.com", "Hoboken", "NJ", "eatdraw200",["Convenience", "Food", "Art"]);

    /* populate reviews */
    let review1, review2, review3, review4;

    r1 = await reviews.createReview("cavingada", "saulAgencies",10, "I was charged with 5 counts of grand theft auto, but got out of it because of Saul.");
    r2 = await reviews.createReview("cavingada", "Napolis",8, "Pizza was great, but it took years for it to finally come.");
    r3 = await reviews.createReview("cavingada", "Johnstheatre",6, "Ambience was great, show was amazing. The acting was subpar, however.");
    r4 = await reviews.createReview("cavingada", "LittleRockGym",8, "I had a great pump at this gym, the lighting makes me look swole.");
    r5 = await reviews.createReview("cavingada", "711store",9, "I'm homies with the cashier and he gave me a discount on some chips");
    r6 = await reviews.createReview("cavingada", "LemonArtStudios",3, "I dont know who the heck was instructing at the studio, but they don't know how to do art.");
    r7 = await reviews.createReview("cavingada", "Garystechstore",9, "Bought a used macbook for $399 and it works perfectly!");
    r8 = await reviews.createReview("cavingada", "AnimalMakeover",1, "My dog was absolutely violated at this store. They came back looking like a shaved sheep D: !");
    r9 = await reviews.createReview("cavingada", "DigitalStudios",10, "I interned here and also had a short film done here. Very professional and high quality gear.");
    r10 = await reviews.createReview("cavingada", "DogFitness",10, "My dog lost lots of weight with the help of trainers and now will live a healthier and longer life.");
    r11 = await reviews.createReview("cavingada", "waxandrelax",8, "The waxing was extremely painful, but it was flawless in the end. Great customer service too!");
    r12 = await reviews.createReview("cavingada", "eatanddraw",3, "I spilled my food over my painting and the instructor yelled at me for doing so. I will not come again.");

    r13 = await reviews.createReview("donjoe23", "saulAgencies",2, "Saul took my money and left me. He is a thief. But he is handsome, so he gets a 2.");
    r14 = await reviews.createReview("donjoe23", "Napolis",10, "Ordered the vodka pizza and it was brilliant. Had a great time with friends and service was amazing.");
    r15 = await reviews.createReview("donjoe23", "Johnstheatre",9, "Came here on the advice of my friend, Paula. The production was spectacular.");
    r16 = await reviews.createReview("donjoe23", "LittleRockGym",7, "The shoulder press machine was broken, so I wasn't able to complete my full routine. Other than that, great gym");
    r17 = await reviews.createReview("donjoe23", "711store",4, "Some items are overpriced, such as the sodas. I think they charge different people different things. Very sketchy.");
    r18 = await reviews.createReview("donjoe23", "LemonArtStudios",6, "While the level of skill was amateur, I did enjoy making new friends in classes.");
    r19 = await reviews.createReview("donjoe23", "Garystechstore",4, "I heard that these guys purchase on the black market and avoid taxes. Unamerican if you ask me! They offered me a lower price if I paid in cash too...");
    r20 = await reviews.createReview("donjoe23", "AnimalMakeover",10, "My little puppy looks so much cuter after the trim and wash. I love this place and the owners are very friendly people.");
    r21 = await reviews.createReview("donjoe23", "DigitalStudios",9, "Had a music video filmed here and the software the production crew uses is top tier.");
    r22 = await reviews.createReview("donjoe23", "DogFitness",10, "My dog dreaded going here very morning, but has definitely benefitted from the exercise routines.");
    r23 = await reviews.createReview("donjoe23", "waxandrelax",8, "Came here with my wife before vacation and thought the place seemed quite nice. My wife also loved the service.");
    r24 = await reviews.createReview("donjoe23", "eatanddraw",7, "Sometimes eating and drawing is the best combination to get your mind off things. Great environment, lovely people.");
    
    //createNewPost(businessName, title, image, postText)
    /* populate posts */
    let p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24;

    p1 = await posts.createNewPost("saulAgencies", "Lawyer Up Now!", "https://www.cheatsheet.com/wp-content/uploads/2022/07/saul-goodman-better-call-saul-season-6.jpg", "This world is very cruel and there are people who would see you incarcerated. Do not fret, Saul is here. Email me at sgoodman@gmail.com to get the best rates in town for defending yourself. Better Call Saul.");
    p2 = await posts.createNewPost("Napolis", "Best pizza in town.", "https://i.ytimg.com/vi/6JHQQBYRlDw/maxresdefault.jpg", "We are the best pizza in Hoboken, that's no question. Come visit us. Even the famous pizza reviewer Dave Portnoy loves our work.");
    p3 = await posts.createNewPost("Johnstheatre", "A Friday Night Spectacle", "https://cdn.choosechicago.com/uploads/2021/07/The-Company-of-Paradise-Square-at-Berkeley-Rep.-Photo_-Kevin-Berne_Berkeley-Repertory-Theatre-scaled.jpg", "Looking for a spectacular Friday night? Our theatre is hosting a magnificent performance on the Gold Rush. Bring your friends, a light snack, and have an awesome time with us.");
    p4 = await posts.createNewPost("LittleRockGym", "Meet Mr. Simmons", "https://people.com/thmb/npvd1xVClyPFeAaKyAcMqxuMT-w=/400x0/filters:no_upscale():max_bytes(150000):strip_icc():gifv():focal(299x0:301x2)/jk-simmons-600-9aad744c0f02478e9e5c6220375d1cbb.jpg", "Mr Simmons is by far the most buff man to have ever existed, soley due to our gym. Simmons loves little rock and attributes his career success to us. Become buff, become Simmons.");
    p5 = await posts.createNewPost("711store", "Slurpies outta this world", "https://i.insider.com/60e613a685fa17001852299d?width=1000&format=jpeg&auto=webp", "We know it and we know you know it, 7-11 has the best slurpees ever. For a low price and great taste, drop by at 7/11 and get that slurpee to cool down a hot summer.");
    p6 = await posts.createNewPost("LemonArtStudios", "Find your inner peace", "https://artbusinessnews.com/wpdev/wp-content/uploads/2021/03/pexels-taryn-elliott-6184428-1170x658.jpg", "Drop by at lemon art studios to see yourself draw to relax the mind. The soul needs taming and we are here for it.");
    p7 = await posts.createNewPost("Garystechstore", "Fall Discount for Students", "http://techpinions.com/wp-content/uploads/2012/06/Retail_Experience_Center_2_web.jpg", "We cherish technology and wish students a successful education. With that being said, we are hosting a 30% discount on all products for students enrolled in a 4 year bachelors program.");
    p8 = await posts.createNewPost("AnimalMakeover", "Make Your Pet Happy", "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/6/18/1371549290951/Crazy-Dog-Grooming-Compet-011.jpg?width=700&quality=85&auto=format&fit=max&s=f3bc44654995c091ec077452c970f8cc", "We love working with all sorts of animals and are willing to accomodate many different styles of makeovers. Want your dog to look like Baby Yoda? Batman? Professor Hill? You got it.");
    p9 = await posts.createNewPost("DigitalStudios", "We are the vessel of your thoughts", "https://i.pinimg.com/originals/3d/4b/cb/3d4bcb6e10d2167fb82cd6538ae5bd26.jpg", "Have an idea that needs to be filmed or produced? We are here for you. Digital Studios has passionate teams committed to producing work far beyond the imagination.");
    p10 = await posts.createNewPost("DogFitness", "GET IN SHAPE", "https://i.ytimg.com/vi/y2-uIQURWv8/hqdefault.jpg", "Want your dog to live longer, become more active, and radiate energy? We are here for you! Meet Tom, our yoga instructor. He is well known for persuading dogs to join his adventures in the spiritual world.");
    p11 = await posts.createNewPost("waxandrelax", "Get smooth my dude", "https://i.ytimg.com/vi/dpVdXUDIHGI/maxresdefault.jpg", "Yes, we all know it. Waxing hurts. But do not fret. Our services are class and prevent our clients from feeling pain. We distract with many activities during the process and use state of the art ointments to prevent any burns or looming pain.");
    p12 = await posts.createNewPost("eatanddraw", "An Inspiring Activity", "https://seoulcos1.b-cdn.net/wp-content/uploads/2021/02/eat-pancakes-while-painting-6-scaled.jpg", "Many artists nowadays need help with inspiration for the projects. We have the solution. In our environment, we provide food and art so artists can feel more relaxed and happy while working. We also have instructors to show how to draw. Come visit for a great experience.");

    /* stop connection */
    await connection.closeConnection();
}

main().catch(console.log);