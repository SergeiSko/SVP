module.exports = function(mongoClient) {
  dbName = "usersdb";
  const tasks = require('../Data/tasks');
  const users = require('../Data/users');
  const state = require('../Data/state');
  const actor = require('../Data/actor');
  mongoClient.connect(function(err, client){
    const db = client.db(dbName);
    AddTasks();
    AddUsers();
    AddState();
    AddActor();
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
          if (err) {return console.log("Server error\nError connect to addUsers: " + err);}
          console.log("State added.");
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
          })
        });
    }
  });
}
