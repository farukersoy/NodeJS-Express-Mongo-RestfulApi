const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
require('dotenv/config');

const app = express();
mongoose.connect(process.env.DB_CONN,
{ useNewUrlParser: true, useUnifiedTopology: true },
() =>{ console.log('Connected to db!'); });

app.use(bodyParser.json());

//Import routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use('/posts', postsRoute);
app.use('/users', usersRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('home page');
});


//listening
app.listen(3000);