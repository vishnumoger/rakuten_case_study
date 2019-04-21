var ObjectID = require('mongodb').ObjectID;
var json2csv = require('json2csv');
var csv      = require('csv-express');
var http = require('http');

module.exports = function(app, db){

app.get('/api/csv_file/:id', (req,res) =>{

    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};

    var options = {
        host : ' https://reqres.in',
        path : ' api/users?page={'+details+'}',
        port : 80,
        method : 'GET'
      }
    
      var request = http.request(options, function(response){
        var body = "";
        const filename   = "users.csv";

        response.on('data', function(data) {
          body += data;
        });
        response.on('end', function() {
          res.send(JSON.parse(body));
        });
      });
      request.on('error', function(e) {
        console.log('Problem with request: ' + e.message);
      });
      request.end();
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader("Content-Disposition", 'attachment; filename='+filename);
      res.send(data)
      res.csv(data, true);

    }) 
}