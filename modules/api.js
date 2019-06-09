module.exports = function(app, mongoClient){
  dbName = "usersdb";

  app.post("/auth", function(req, res){
    let userData = {"login": req.body.login, "password": req.body.password};
    console.log(userData);
    mongoClient.connect(function(err, client){
      const db = client.db(dbName);
      const collection = db.collection("users");

      collection.findOne(userData, function(err, results){
        if(results != null){
          console.log("post findOne: results=null");
          res.setHeader('Content-Type', 'application/json');
          res.send(`{"respons": true}`);
          res.statusCode = 200;
        }
        else{
          res.setHeader('Content-Type', 'application/json');
          res.send(`{"respons":false}`);
          res.statusCode = 303;
          console.log(`Authtorization: U: ${userData}`);
          console.log(results);
        }
        client.close();
      });
    });
  });

  app.post("/reg", function(req, res) {
    let user = {login: req.body.login, password: req.body.password};

    mongoClient.connect(function(err, client){
      if (err) {return console.log(`Api error\nError connect to MDB\n(/reg): ${err}"`);}
      const db = client.db(dbName);
      const collection = db.collection("users");
      collection.findOne({login: req.body.login}, function(err, results){
        if (err) {return console.log("Api error\nError findOne\n(/reg): " + err);}
        if(results == null){
          collection.insertOne(user, function(err, results){
            return console.log(`Api\n/req\ninsertOne(users) ${err}`);
            res.setHeader('Content-Type', 'application/json');
            res.send(`{"respons": true}`);
            res.statusCode = 200;
            console.log(`Reg'd: l:${req.body.login} p:${res.body.password}`);
          });
        }
        else{
          res.setHeader('Content-Type', 'application/json');
          res.send(`{"respons":false}`);
          res.statusCode = 301;
          console.log("Error: This user is registered.");
        }
      });
    });
  });

  app.get("/getTesks", function(req, res) {
    mongoClient.connect(function(err,client){
      if (err) {return console.log("Api error\nError connect to MDB\n(/getTesks): " + err);}
      const db = client.db(dbName);
      const collection = db.collection("Tesks");
      collection.find().toArray(function(err, results){
        if (err) {return console.log("Api error\nError find.toArray\n(/getTesks): " + err);}
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        res.send("кук");
        client.close();
      });
    });
  });

  app.post("/insertTesks", function(req, res){
    mongoClient.connect(function(err, client) {
      if (error) {return console.log("Api error\nError connect to MDB\n(/insertTesks): " + error);}
      const db = client.db(dbName);
      db.collection("Tesks").count({}, function(error, num) {
        if (error) {return console.log("Api error(/insertTesks): " + error);}
        console.log(num);
      })

    })
    mongoClient.connect(function(err, client){
      const db = client.db(dbName);
      const collection = db.collection("Tesks");
      collection.insert(req.body, function(err, results){
        if(err)
        {return console.log("Api error: " + err);}
        res.statusCode = 201;
        res.send("inserted");
      });
      client.close();
    });
  });
}
