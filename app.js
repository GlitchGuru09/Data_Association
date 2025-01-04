const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');


const port = 3000;

app.get('/', function(req,res){
    res.send("hello");
})

app.get('/create', async function(req,res){
    let user = await userModel.create({
        username: "Shrey",
        age: "22",
        email: "shreyvernekar@gmail.com"
    })

    res.send(user);
})

app.get('/post/create', async function(req,res){
    let post = await postModel.create({
        postdata: "hello product",
        user: "6778d4b5a0160e59372fedc3",
    })

    let user = await userModel.findOne({_id:"6778d4b5a0160e59372fedc3"});
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});
})


app.listen(port, function(err){
    console.log(`Server running on port: ${port}`);
})