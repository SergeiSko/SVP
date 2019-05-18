const express = require('express');
      parser = require('body-parser');
      MongoClient = require('mongodb').MongoClient;
      app = express();
      port = 3000;

app.use("/public", express.static(__dirname + '/public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
const mongoClient = new MongoClient("mongodb://localhost:27017", {useNewUrlParser: true});


app.get("/", function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send(__dirname + '\\public\\index.html');
});

app.post("/test", function(req, res){
  console.log(req.body);
  if(res != "undefined"){
    res.statusCode = 200;
    let users = [{name: "Sergei", surname: "Skoblin", age: 20},
                 {name: "Petr", surname: "Ivanov", age: 20}]
    mongoClient.connect(function(err, client) {
      const db = client.db("usersdb");
      const collection = db.collection("users");

      collection.insertMany(users, function(err, results){
        console.log(results);
        res.send(results);
        client.close();
      })

      client.close();
    });
  }
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
