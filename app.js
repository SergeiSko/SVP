var express = require('express');
var app = express();
var port = 80;

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  res.send("hello world");
})








app.get("*", function(req, res){
  res.send('not found');
});

app.listen(port, function(){
  console.log(`Listening: ${port} port.`);

});
