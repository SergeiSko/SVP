module.exports = function(app, mongoClient){
  dbName = "usersdb";


    app.post("/auth", function(req, res){
      let userData = {"login": req.body.login, "password": req.body.password};
      console.log(userData);
      mongoClient.connect(function(err, client){
        const db = client.db(dbName);
        const collection = db.collection("Users");

        collection.findOne(userData, function(err, results){
          if(results != null){
            res.setHeader('Content-Type', 'application/json');
            res.send(`{"response": true, "userId": "${results._id}", "userTypy": "${results.actor}"}`);
            res.statusCode = 200;
            console.log(`Authtorization: U: ${userData}`);
            console.log(results);
          }
          else{
            res.setHeader('Content-Type', 'application/json');
            res.send(`{"response":false}`);
            res.statusCode = 303;
            console.log(`post findOne: results=null`);
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
      const collection = db.collection("Users");
      collection.findOne({login: req.body.login}, function(err, results){
        if (err) {return console.log("Api error\nError findOne\n(/reg): " + err);}
        if(results == null){
          collection.insertOne(user, function(err, results){
            return console.log(`Api\n/req\ninsertOne(users) ${err}`);
            res.setHeader('Content-Type', 'application/json');
            res.send(`{"response": true}`);
            res.statusCode = 200;
            console.log(`Reg'd: l:${req.body.login} p:${res.body.password}`);
          });
        }
        else{
          res.setHeader('Content-Type', 'application/json');
          res.send(`{"response":false}`);
          res.statusCode = 301;
          console.log("Error: This user is registered.");
        }
      });
    });
  });

  app.get("/getTasks", function(req, res) {
    mongoClient.connect(function(err,client){
      if (err) {return console.log("Api error\nError connect to MDB\n(/getTasks): " + err);}
      const db = client.db(dbName);
      const collection = db.collection("Tasks");
      collection.find().toArray(function(err, results){
        if (err) {return console.log("Api error\nError find.toArray\n(/getTasks): " + err);}
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        res.send(results);
        client.close();
      });
    });
  });

  app.post("/insertTasks", function(req, res){
    //var newTask = {};
    mongoClient.connect(function(err, client) {
      if (err) {return console.log("Api error\nError connect to MDB\n(/insertTasks): " + err);}
      const db = client.db(dbName);
      db.collection("Tasks").count({}, function(error, num) {
        if (error) {return console.log("Api error(/insertTasks): " + error);}
        console.log(num);
      });

    });
    mongoClient.connect(function(err, client){
      const db = client.db(dbName);
      const collection = db.collection("Tasks");
      collection.insert(req.body, function(err, results){
        if(err)
        {return console.log("Api error: " + err);}
        res.statusCode = 201;
        res.send("inserted");
      });
      client.close();
    });
  });
  app.post("/updateTask", function(req, res){
    mongoClient.connect(function(err, client){
      const db = client.db(dbName);
      const collection = db.collection("Tasks");
      collection.update(
        {"_id": req.body._id},
        {$set: {"state": req.body.stateId}},
        {upsert: false},
        function(err, results){
          if (err) {return console.log("Api error\nError connect to MDB\n(/updateTasks): " + err);}
          console.log(results);
        }
      );
    });
  });
  app.post("/deleteTasks", function(req, res){
    mongoClient.connect(function(err, client){
      const db = client.db(dbName);
      const collection = db.collection("Tasks")
      collection.remove({"_id": req.body._id}, function(err, results) {
        if (err) {return console.log("Api error\n(/deleteTasks): " + err);}
        console.log(results);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(results);
      });
    });
  });
  app.post("/support", function(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send("Good");
  });
}
