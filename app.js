const express = require('express');
      parser = require('body-parser');
      MongoClient = require('mongodb').MongoClient;
      mongoClient = new MongoClient("mongodb://localhost:27017", {useNewUrlParser: true});
      cookieParser = require('cookie-parser');
const app = express();
      port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(cookieParser());

require('./modules/tests.js')(app, mongoClient);
require('./modules/api.js')(app, mongoClient);

app.get("/*", function(req, res){
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.send('not found(my)');
});

app.listen(port, (err) => {
  if(err){
    return console.error(`On ${err.stack()}\nServer error: ${err}`);
  }
  else {
    const tesks = require('./tesks');
    const users = require('./users');
    console.log(`Listening: ${port} port.`);
    mongoClient.connect(function(err, client){
      if (err) {return console.log("Server error\nError connect to MDB\n(/reg): " + err);}
      const db = client.db(dbName);
      let collection = db.collection("Tesks");
      collection.remove({}, function(err, results){
        if (err) {return console.log("Server error\nError connect to removeTesks\n(/reg): " + err);}
        console.log("Tesks removed.");
        collection.insertMany(tesks, function(err, results){
          if (err) {return console.log("Server error\nError connect to addTesks\n(/reg): " + err);}
          console.log("Tesks added.");
          console.log(results);
        });
      });
      collection = db.collection("users");
      collection.remove({}, function(err, results) {
        if (err) {return console.log("Server error\nError connect to addUsers\n(/reg): " + err);}
        console.log("Users removed.");
        collection.insertMany(users, function(err, results) {
          if (err) {return console.log("Server error\nError connect to removeUsers\n(/reg): " + err);}
          console.log("Users added.");
        })
      })
    });
  }
});
