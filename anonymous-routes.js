var express    = require("express");
var pg = require('pg');

var app = module.exports = express.Router();
var conString = "postgres://postgres:root@localhost/pfe";



app.get("/list",function(req,res){
  pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from avis', err);
      }
      client.query('SELECT * from avis', function(err, result) {
        done();
        if(err) {
          return console.error('error running query', err);
        }      
        res.status(200).send(result.rows); 
      });
  });
});


app.post('/addAvis', function(req, res) {

    var proprete = req.body.proprete;
    var tranquilite = req.body.tranquilite;
    var services = req.body.services;
    var beaute = req.body.beaute;
    var raison = req.body.venue;


 pg.connect(conString, function(err, client, done) {
    client.query(
        'INSERT into avis (proprete, tranquilite, services, beaute, raison) VALUES($1, $2, $3, $4, $5)', 
            [proprete, tranquilite, services, beaute, raison],  

            function(err, result) {
                if (err) {                    
                    console.log(err);   
                } else {
                    console.log('insérer dans bd');
                }
            });            
  });
});

