var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'ejs')
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://aram20030905:6sX8QBFXALXUviuO@cluster0.zjvkkda.mongodb.net/sample_mflix';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', function (req, res) {
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');

      try {

         const mascots = await mongoose.connection.db.collection('theaters').
            find({ 'location.address.city': 'Bloomington' }).toArray();
         res.render("../public/form.ejs", {
            mascots: mascots
         })



      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }
   });
});



app.post('/addInfo', function (req, res) {

   const name = req.body.name

   const password = req.body.password
   const email = req.body.email


   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');

      try {
         const allMovies = await mongoose.connection.db.collection('users').insertOne({
            name: name,
            password: password,
            email: email
         })
         const mascots = await mongoose.connection.db.collection('theaters').
            find({ 'location.address.city': 'Bloomington' })
         res.render("../public/form.ejs", {
            mascots: mascots

         })


         console.log('All Movies:', allMovies);
      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }
   });




});

app.use(express.static('public'))

app.get('/*', function (req, res) {
   res.send("<h1>404 not found</h1>");
});





app.listen(3000, function () {
   console.log("Example is running on port 30001")
})









