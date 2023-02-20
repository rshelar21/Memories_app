const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

// console.log(process.env.DATABASE_URL);

// import postRoutes from './routes/posts.js';
const postRoutes = require('./routes/posts.js');
const userRoutes = require('./routes/users.js');


app.use(cors()); // cors middleware to allow cross origin requests from the client side to the server side and always put it before the routes middleware 
app.use(bodyParser.json({limit : '50mb', extended : true}));
app.use(bodyParser.urlencoded({limit : '50mb', extended : true}));


app.use('/posts', postRoutes);
app.use("/users", userRoutes)




mongoose.connect(process.env.DATABASE_URL).then((res) => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
})


app.listen(port , ()=> {
    console.log(`Server running on port: ${port}`)
})

