module.exports = function(mongoClient) {
  dbName = "usersdb";
  var checks = [0, 0, 0, 0, 0];
  const tasks = require('../Data/tasks');
  const users = require('../Data/users');
  const state = require('../Data/state');
  const actor = require('../Data/actor');
  const uData = require('../Data/userData');
  mongoClient.connect(function(err, client){
    const db = client.db(dbName);
    AddTasks();
    AddUsers();
    AddState();
    AddActor();
    AddUData();
    function AddTasks()
    {
      const collectionTasks = db.collection("Tasks");

      //Cleaning tasks list

      collectionTasks.remove({}, function(err, results){
        if (err) {return console.log("Server error\nError connect to removeTasks\n(/reg): " + err);}
        else console.log("Tasks removed.");

        //Adding first tasks

        collectionTasks.insertMany(tasks, function(err, results){
          if (err) {return console.log("Server error\nError connect to addTasks\n(/reg): " + err);}
          else {
            console.log("Tasks added.");
            checks[0] = 1;
            checks();
          }
        });
      });
    }
    function AddUsers(){
      const collectionUsers = db.collection("Users");

      //Cleaning users list

      collectionUsers.remove({}, function(err, results) {
        if (err) {return console.log("Server error\nError connect to removeUsers: " + err);}
        console.log("Users removed.");

        //Adding first users

        collectionUsers.insertMany(users, function(err, results) {
          if (err) {return console.log("Server error\nError connect to addUsers: " + err);}
          console.log("Users added.");
          checks[1] = 1;
          checks();
        })
      });
    }
    function AddState(){
      const collectionState = db.collection("State");

      //Cleaning state list

      collectionState.remove({}, function(err, results){
        if (err) {return console.log("Server error\nError connect to removeState: " + err);}
        console.log("State removed.");

        //Adding first state

        collectionState.insertMany(state, function(err, results) {
          if (err) {return console.log("Server error\nError connect to addState: " + err);}
          console.log("State added.");
          checks[2] = 1;
          checks();
        })
      });
    }
    function AddActor(){
        const collectionActor = db.collection("Actor");

        //Cleaning state list

        collectionActor.remove({}, function(err, results){
          if (err) {return console.log("Server error\nError connect to removeActor: " + err);}
          console.log("Actor removed.");

          //Adding first state

          collectionActor.insertMany(actor, function(err, results) {
            if (err) {return console.log("Server error\nError connect to addActor: " + err);}
            console.log("Actor added.");
            checks[3] = 1;
            checks();
          })
        });
    }

    function AddUData(){
      const collection = db.collection("userData");

        //Cleaning userData list

      collection.remove({}, function(err, results){
        if (err) {return console.log("Server error\nError connect to removeUserData: " + err);}
        console.log("UserData removed.");

        //Adding first userData

        collection.insertMany(actor, function(err, results) {
          if (err) {return console.log("Server error\nError connect to addUserData: " + err);}
          console.log("UserData added.");
          checks[4] = 1;
          checks();
        })
      });
    }
    function checks(){
      if(checks[4] == 1)
      if(checks[3] == 1)
      if(checks[2] == 1)
      if(checks[1] == 1)
      if(checks[0] == 1)
      {console.log("Server running without problems!!!");}
    }
  });

}
