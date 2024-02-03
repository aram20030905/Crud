var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
const { ObjectId } = require('mongoose').Types;
app.set('view engine', 'ejs')
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://aram20030905:6sX8QBFXALXUviuO@cluster0.zjvkkda.mongodb.net/Tumo_product';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', function (req, res) {
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');

      try {

         const mascots = await mongoose.connection.db.collection('products').find().toArray();
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



app.get("/delete/:id", function (req, res) {
 var id = req.params.id;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('products').deleteOne({_id: new ObjectId(id)});
            res.json(result);
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});


app.get("/update/:id", function (req, res) {
   var id = req.params.id;
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
       try {
           let result = await mongoose.connection.db.collection('products').findOne({_id: new ObjectId(id)});
           res.render('../public/update.ejs', {
               obj: result
           });
       } catch (error) {
           console.error('Error retrieving movies:', error);
       } finally {
           mongoose.connection.close();
       }
   })
});


app.post("/updateData", function (req, res) {
   const name1 = req.body.name;
   const surname1 = req.body.surname;
   const email1 = req.body.email;
   const login1 = req.body.login;
   const pass1 = req.body.pass;
   const phone1= req.body.phone;
   const id=req.body.id

   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;

   db.on('error', console.error.bind(console, 'Connection error:'));

   db.once('open', async () => {
       console.log('Connected to MongoDB!');

       try {
           let result = await mongoose.connection.db.collection('products').updateOne(
               { _id: new ObjectId(id) },
               { $set: { name: name1, surname: surname1, email: email1, login: login1, pass: pass1,  phone: phone1, } }
           );

           res.redirect("/")
       } catch (error) {
           console.error('Error updating product:', error);
       } finally {
           mongoose.connection.close();
       }
   });
});





app.post('/addInfo', function (req, res) {

   const name = req.body.name

   const surname = req.body.surname
   const email = req.body.email
   const login = req.body.login
   const pass = req.body.pass
   const phone = req.body.phone


   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');
      try {
         const allMovies = await mongoose.connection.db.collection('products').insertOne({name:name,surname:surname, email:email,login:login,pass:pass, phone:phone})

         res.redirect('/')
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
