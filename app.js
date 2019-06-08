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

/*app.get("/*", function(req, res){
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.send('not found(my)');
});*/

app.listen(port, (err) => {
  if(err){
    return console.error(`Server error: ${err}`);
  }
  else {
    const tesks = {}
    console.log(`Listening: ${port} port.`);
    mongoClient.connect(function(err, client){
      const db = client.db(dbName);
      const collection = db.collection("Tesks");
      collection.remove({}, function(err, results){
        console.log("Tesks removed.");
        collection.insertMany(tesks, function(err, results){
          console.log("Tesks added.");
        });
      });
    });
  }
});
