module.exports = function(mongoClient) {
  dbName = "usersdb";
  const tasks = require('./Data/tasks');
  const users = require('./Data/users');
  tasks();
  users();
  mongoClient.connect(function(err, client){
    function tasks()
    {
      const db = client.db(dbName);
      const collectionTasks = db.collection("Tasks");
      collectionTasks.remove({}, function(err, results){
        if (err) {return console.log("Server error\nError connect to removeTasks\n(/reg): " + err);}
        else console.log("Tasks removed.");
        collectionTasks.insertMany(tasks, function(err, results){
          if (err) {return console.log("Server error\nError connect to addTasks\n(/reg): " + err);}
          else {
            console.log("Tasks added.");
          }
        });
      });
    }
    if (err) {return console.log("Server error\nError connect to MDB\n(/reg): " + err);}
    const collectionUsers = db.collection("Users");
    collectionUsers.remove({}, function(err, results) {
      if (err) {return console.log("Server error\nError connect to addUsers: " + err);}
      console.log("Users removed.");
      collectionUsers.insertMany(users, function(err, results) {
        if (err) {return console.log("Server error\nError connect to removeUsers: " + err);}
        console.log("Users added.");
      })
    })
  });
}
