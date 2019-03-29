var express = require('express');
    parser = require('body-parser');
    app = express();
    port = 3000;
//var file = require('test.json');

app.use(express.static(__dirname + '/public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain')
  res.send('public/index.html');
});

app.get("/getJSON", function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.sendfile('test.json');
});

app.post("/postDate", function(req, res){
  console.log(req.body.name);
  res.send(`Идите нахуй ${req.body.name}`);
});




app.get("*", function(req, res){
  res.send('not found');
});

app.listen(port, function(){
  console.log(`Listening: ${port} port.`);

});
