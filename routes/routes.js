module.exports = function(app, mongoClient){

    app.get("/", function(req, res){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.send('public/index.html');
    });

    
    app.get("/*", function(req, res){
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.send('not found(my)');
    });
}
