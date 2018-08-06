


var http = require('http');
var express = require('express');
var app = express();
var fs=require('fs');
var url = require('url');
var querystring = require('querystring');
var qdata="";
var number="0";
var ok="notok";
app.use('/ok', express.static(__dirname + '/public/ok.html'));
app.use('/notok', express.static(__dirname + '/public/notok.html'));

app.get('/ok', function(req, res){
console.log('got ok');
});

app.get('/notok', function(req, res){
  console.log('got ok');
  });

app.get('/manu/:mid', function(req, res){
  var q = req.params.mid;
  console.log(q);
 var p = {
  'manufactureid': q
 };
  var MongoClient = require('mongodb').MongoClient;
  var link1 = "mongodb://localhost:27017/";
  
  MongoClient.connect(link1, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nfc");
    //Find the first documongment in the customers collection:
    dbo.collection("productdetails").findOne(p, function(err, result) {
      if (err)throw err;
      var res1=result;
      //console.log(result.manufacturedate);
      
      if(res1){
      console.log("it is valid");
      return res.redirect('/ok');
        
    }else{
        console.log("it is invalid");
        return res.redirect('/notok');
      }
      
      
      db.close();
    });
  });

  
});


app.listen(8080);
