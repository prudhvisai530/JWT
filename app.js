const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoute')
const cookieParser = require('cookie-parser');
const authRoute = require('./middleware/authRoute');

app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1/jwt", {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(result => {
    app.listen(3000, ()=>{
        console.log("server started")
    });
}).catch(err => console.log(err));

app.use('/auth',authRoutes);
app.get('/smoothies',authRoute, (req,res)=>{res.status(200).send("Login Successful")});
