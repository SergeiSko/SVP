const express = require('express');
      parser = require('body-parser');
      MongoClient = require('mongodb').MongoClient;

const app = express();
      port = 3000;
      urldb = "mongodb://localhost:27017";
      dbName = "usersdb";

app.use(express.static(__dirname + '/public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.get("/", function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send('public/index.html');
});

app.get("/getJSON", function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.sendfile('test.json');
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

app.get("/getMDB", function(req, res){//for testing
  const mongoClient = new MongoClient(urldb, {useNewUrlParser: true});

  mongoClient.connect(function(err, client){
    const db = client.db(dbName);
    const collection = db.collection("users");

    collection.find().toArray(function(err, results) {
      console.log("Get db data(get-test)");
      res.send(results);
      client.close();
    });
  });
});

app.post("/sendMDB", function(req, res){//for testing
  const mongoClient = new MongoClient(urldb, {useNewUrlParser: true});
  let users = [{name: "Sergei", surname: "Skoblin", age: 20},
              {name: "Petr", surname: "Ivanov", age: 20}];
  mongoClient.connect(function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("users");

    collection.insertMany(users, function(err, results){
      console.log("Sended db data(send-test)");
      client.close();

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.send("god");
    });
  });
});

app.post("/auth", function(req, res){
  let userData = {"login": req.body.login, "password": req.body.password};
  const mongoClient = new MongoClient(urldb, {useNewUrlParser: true});
  console.log(userData);
  mongoClient.connect(function(err, client){
    const db = client.db(dbName);
    const collection = db.collection("users");

    collection.find(userData, function(err, results){
      console.log(`Authtorization: L: ${req.body.login} P: ${req.body.password}`);
      if(results != ""){
        res.send({"respons": true});
        res.statusCode = 200;
      }
      else{
        res.send({"respons":false});
        res.statusCode = 303;
        console.log(results);
      }
      client.close();
    });
  });
});

app.post("/reg", function(req, res) {
  let user = {login: req.body.login, password: req.body.password};
  const mongoClient = new MongoClient(urldb, {useNewUrlParser: true});

  mongoClient.connect(function(err, client){
    const db = client.db(dbName);
    const collection = db.collection("users");

    collection.findOne({login: req.body.login}, function(err, results){
      if(results == null){
        collection.insertOne(user, function(err, results){
          res.send(true);
          res.statusCode = 200;
          console.log(`Reg'd: l:${req.body.login} p:${res.body.password}`);
        });
      }
      else{
        res.send(false);
        res.statusCode = 301;
        console.log("Error: This user is registered.");
      }
    });
  });
});

app.post("/registration", function(req, res) {
  let users = {name: req.body.name, surname: req.body.surname, age: req.body.age};
  const mongoClient = new MongoClient(urldb, {useNewUrlParser: true});

  mongoClient.connect(function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("users");

    collection.insertOne(users, function(err, results){
      console.log("Sended db data(registration)");
      res.send(results);
      res.statusCode = 200;
      client.close();
    })
    client.close();
  });
});

/*app.post("/checkUser", function(req, res) {
  const mongoClient = new MongoClient(urldb, {useNewUrlParser: true});
  mongoClient.connect(function(err,client){
    const db = client.db(dbName);
    const collection = db.collection("users");

  });
});*/

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
