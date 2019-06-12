const express = require('express');
      parser = require('body-parser');
      MongoClient = require('mongodb').MongoClient;
      cookieParser = require('cookie-parser');
      //date = new Date();
const app = express();
      mongoClient = new MongoClient("mongodb://localhost:27017", {useNewUrlParser: true});
      port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(cookieParser());

require('./modules/tests.js')(app, mongoClient);
require('./modules/api.js')(app, mongoClient);
require('./routes/routes.js')(app, mongoClient);

app.listen(port, function(err){
  if(err){
    return console.error(`On ${err.stack()}\nServer error: ${err}`);
  }
  else {
    require('./modules/prepare.js')(mongoClient);
    console.log(`Listening: ${port} port.`);
  }
});
