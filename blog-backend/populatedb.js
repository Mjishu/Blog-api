#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const User = require("./models/user");
  const Comments = require("./models/comments");
  const Posts = require("./models/posts")
  
  const users = [];
  const posts = [];
  const comments = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createPosts();
    await createComments(); //! Comment this out untill i can get posts to show up in comments in the DB
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function usersCreate(index, username,password,isAuthor) {
    const userDetail = {username:username, password:password, isAuthor:isAuthor}

    const user = new User(userDetail);
    await user.save();
    users[index] = user;
    console.log(`Added user: ${username}`);
  }
  
  async function commentsCreate(index,text,username,date,posts) {
    const commentdetail = { text:text,
                            username:username,
                            date:date,
                            posts:posts };
  
    const comment = new Comments(commentdetail);
  
    await comment.save();
    comments[index] = comment;
    console.log(`Added comment: ${comment}`);
  }
  
  async function postsCreate(index,image,title,description,date,user,isPublished){
    const postsdetail = {image:image,title:title,description:description,date:date,user:user,isPublished:isPublished};

    const post = new Posts(postsdetail);
    await post.save();
    posts[index] = post;
    console.log(`Added Posts: ${title} by ${user}`)
  }
  
  async function createUsers() {
    console.log("Adding users");
    await Promise.all([
      usersCreate(0,"user1","password1", true ),
      usersCreate(1,"user2","password2", false ),
      usersCreate(2,"user3","password3", false ),
    ]);
  }
  
  
  async function createPosts(){
    console.log("adding posts")
    await Promise.all([
        postsCreate(0,'',"to slay a dragon", "I went and slayed a dragon", new Date(), users[0], true),
        postsCreate(1,'',"I lied", "I didnt actually kill a dragon", new Date(), users[0], false),
        postsCreate(2,'',"To actually slay a dragon", "This time i will actually slay a dragon", new Date(), users[0], false)
    ])
  }

  async function createComments(){
    console.log("adding comments")
    await Promise.all([
        commentsCreate(0,"i love your work", "Billy Winkle",new Date(),posts[0]),
        commentsCreate(1,"i hate your work","Jill Namy", new Date(),posts[0]),
        commentsCreate(2,"im mild about your work","Yoru Mika" ,new Date(),posts[0]),
        commentsCreate(3,"boo","blah",new Date(),posts[2])
    ])
  }