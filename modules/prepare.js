

module.exports = function(mongoClient) {
  dbName = "usersdb";
  const tasks = require('../Data/tasks');
  const users = require('../Data/users');
  const state = require('../Data/state');
  const actor = require('../Data/actor');
  const uData = require('../Data/userData');
  mongoClient.connect(function(err, client){
    if(err) return console.error(err);
    const db = client.db(dbName);
    var checks = [0, 0, 0, 0, 0];
    AddTasks(client, db);
    AddUsers(client, db);
    AddState(client, db);
    AddActor(client, db);
    AddUData(client, db);
  });
  function AddTasks(client, db)
  {
    const collection = db.collection("Tasks");
    collection.remove({}, function(err, results){
      if (err) {return console.log("Server error\nError connect to removeTasks\n(/reg): " + err);}
      else console.log("Tasks removed.");
      checks[0] = 2;
    });
    collection.insertMany(tasks, function(err, results){
      if (err) return console.log("Server error\nError connect to addTasks\n(/reg): " + err);
      else {
        console.log("Tasks added.");
        checks[0] = 1;
        checks();
      }
    });
  }
  function AddUsers(client, db){
    const collection = db.collection("Users");
    collection.remove({}, function(err, results) {
      if (err) {return console.log("Server error\nError connect to removeUsers: " + err);}
      console.log("Users removed.");
      checks[1] = 2;
    });
    collection.insertMany(users, function(err, results) {
      if (err) {return console.log("Server error\nError connect to addUsers: " + err);}
      console.log("Users added.");
      checks[1] = 1;
      checks();
    });
  }

  function AddState(client, db){
    const collection = db.collection("State");
    collection.remove({}, function(err, results){
      if (err) {return console.log("Server error\nError connect to removeState: " + err);}
      console.log("State removed.");
      checks[2] = 2;
    });
    collection.insertMany(state, function(err, results) {
      if (err) {return console.log("Server error\nError connect to addState: " + err);}
      console.log("State added.");
      checks[2] = 1;
      checks();
    });
  }
  function AddActor(client, db){
    const collection = db.collection("Actor");
    collection.remove({}, function(err, results){
      if (err) {return console.log("Server error\nError connect to removeActor: " + err);}
      console.log("Actor removed.");
      checks[3] = 2;
    });
    collection.insertMany(actor, function(err, results) {
      if (err) {return console.log("Server error\nError connect to addActor: " + err);}
      console.log("Actor added.");
      checks[3] = 1;
      checks();
    });
  }
  function AddUData(client, db){
    const collection = db.collection("userData");
    collection.remove({}, function(err, results){
      if (err) {return console.log("Server error\nError connect to removeUserData: " + err);}
      console.log("UserData removed.");
      checks[4] = 2;
    });
    collection.insertMany(uData, function(err, results) {
      if (err) {return console.log("Server error\nError connect to addUserData: " + err);}
      console.log("UserData added.");
      checks[4] = 1;
      checks();
    });
  }
  function checks(){
    if(checks[4] == 1)
    if(checks[3] == 1)
    if(checks[2] == 1)
    if(checks[1] == 1)
    if(checks[0] == 1)
    console.log("Server running without problems!!!");
    /*if(checks[0] == 2)
    console.log("Error in AddTasks");
    else if(checks[1] == 2)
    console.log("Error in AddUsers");
    else if(checks[2] == 2)
    console.log("Error in AddState");
    else if(checks[3] == 2)
    console.log("Error in AddActor");
    else if(checks[4] == 2)
    console.log("Error in AddUData");*/
  }
}
