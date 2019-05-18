const express = require('express');
      parser = require('body-parser');
      MongoClient = require('mongodb').MongoClient;
      app = express();
      port = 3000;
      ejs = require('ejs');
      promisify = require('util').promisify;
      users = require(__dirname + '\\public\\libs\\users');
//var file = require('test.json');

app.use("public", express.static(__dirname + '/public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

const mongoClient = new MongoClient("mongodb://localhost:27017", {useNewUrlParser: true});
mongoClient.connect(function(err, client) {
  if(err){
    return console.log(err);
  }

  const db = client.db("dbV1");
  const collection = db.collection("users");


  client.close();
});

const requestHandler = (req, res) => {
  const renderFile = promisify(ejs.renderFile).bind(ejs);

  async function renderTemplare(){
    try{
      return await renderFile(__dirname + '/templates/template.ejs');
    } catch(err){
      throw(err);
    }
  }
}

app.get("/", function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  //res.send('hhuuh');
  //res.sendfile(__dirname + '\\public\\template\\template.ejs');
  //res.send(__dirname + 'public/index.html');
  let params = {};
  params.page = 'insert';

  const wordArray = users.itemsRu;
  res.send("-->" + users);
});

app.get("/getJSON", function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.sendfile('test.json');
});

app.get("/str", function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send("Good response.");
});

app.post("/Data", function(req, res){
  console.log(req.body.name);
  if(res != "undefined"){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send(`Hello, ${req.body.name}!!!`);
  }
  else {
    res.statusCode = 434;
    res.send(`Data ${req.body.name}`);
  }
});

app.post("/test", function(req, res){
  console.log(req.body);
  if(res != "undefined"){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('god');
  }
});

app.get("*", function(req, res){
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.send('not found(my)');
});

app.listen(port, (err) => {
  if(err){
    return console.error(`Server error: ${err}`);
  }
  console.log(`Listening: ${port} port.`);

});
