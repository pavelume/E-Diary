//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
const _ = require('lodash');


const homeStartingContent = "Hello here i'm your personal diary, you can share with me your felling............";
const aboutContent = "The dream solution, We are providig Desktop based software, e-Commerce site and  Web application.";
const contactContent = "If you have any complain or feedback just send me a mail to : pavel.ume9@gmail.com";

const app = express();


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = []; 

app.get("/",function(req,res){
  res.render("home",{
    StartingContent:homeStartingContent,
    posts: posts
  });
  
});

app.get("/contact",function(req,res){
res.render("contact",{Content:contactContent})
});
 
app.get("/about",function(req,res){
res.render("about",{Content:aboutContent})

});

app.get("/compose",function(req,res){
  res.render("compose");
  
  });

app.post("/compose",function(req,res){
 

const post={

   title: req.body.postTitle,
   content: req.body.postBody
  
 }; 

 posts.push(post);
res.redirect("/");
  
});

app.get("/posts/:postName",function(req,res){
  const requestTitle = _.lowerCase(req.params.postName);  
//Upper case to lower case Title//

   
posts.forEach(function(post){
  const storedTitle = _.lowerCase(post.title);
if(storedTitle==requestTitle){     
res.render("post",{
  title: post.title,
  content: post.content

});

}


});

});





 

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
