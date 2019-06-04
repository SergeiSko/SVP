module.exports = function(app, mongoClient){
  const dbName = "usersdb";


  
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



  app.post("/registration", function(req, res) {
    let users = {name: req.body.name, surname: req.body.surname, age: req.body.age};

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

  app.get("/getMDB", function(req, res){//for testing

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
}
