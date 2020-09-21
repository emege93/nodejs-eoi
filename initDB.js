const mongoose = require('mongoose');

const User = require('./models/user');
const Post = require('./models/post');

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: true,
        useCreateIndex: true
    }).catch(err => console.log(err));

const user = new User({email: 'ejemplo@ejemplo.com'});
user.save((err) => console.log(err));
const post = new Post(
    {
        title: 'titulo',
        slug: 'slug',
        text: 'asdasdasdasd'
    });
post.save((err) => console.log(err));

console.log(user);
console.log(post);