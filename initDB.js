const mongoose = require('mongoose');

const User = require('./models/user');

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: true,
        useCreateIndex: true
    }).catch(err => console.log(err));

const user = new User({email: 'ejemplo1@ejemplo.com', password: '1234'});
user.save().then(() => {
    mongoose.connection.close()
})
console.log(user);
