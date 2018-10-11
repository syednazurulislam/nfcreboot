var http = require('http');
var express = require('express');

var app = express();
var fs=require('fs');
var url = require('url');
var querystring = require('querystring');
const bodyParser = require("body-parser");
const assert = require('assert');
var state = {};
var array=[];
var data=[];
var you;
var qdata="";
var number="0";
var ok="notok";
app.set('view engine','ejs');
app.use('/ok', express.static(__dirname + '/public/ok.html'));
app.use('/notok', express.static(__dirname + '/public/notok.html'));
app.use('/tamper', express.static(__dirname + '/public/tamper.html'));
app.use('/tamperok', express.static(__dirname + '/public/tamperok.html'));
app.use('/index', express.static(__dirname + '/public/post.html'));
app.use('/multichain', express.static(__dirname + '/views/admin.ejs'));
app.use('/loginuser', express.static(__dirname + '/views/loginwebuser.html'));


app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
let multichain = require("multichain-node")({
  port: 7444,
  host: '54.213.253.239',
  user: "multichainrpc",
  pass: "33vCCjN8WPF7eNcqMwjVvWvopDTTXBrwS4C9aW8GFwDb"
});

multichain.getInfo((err, info) => {
  if(err){
      throw err;
  }
  console.log(info);
})





       






app.get('/assetdetails/',function(req,res){
  console.log("---------------------------------im in assetdetails--------------------------------------------")
  var  address3 =req.query.address;
  var  assetname =req.query.assetname;
  var  city =req.query.city;
console.log(city+" ===============================>city name fron the asset details");
  console.log("this assetname from asserdetails");
  console.log(assetname);
  console.log("this address from asserdetails");
  console.log(address3+" ==============================>this the address from assetdetails json form from other page");
  var j;


multichain.listAssets({asset:assetname}).then(res=>{
  console.log(res);
  console.log(res[0].details);
  state.details1=res[0].details;
})
    multichain.getAddresses((err, addresses) => {

      console.log(addresses);
      var i=0;

      while(addresses[i]){
        console.log(i);
        console.log("this is while loop");
        console.log(addresses[i]);
        
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("user_crud1");
        
        var query = { blockchainaddress1:addresses[--i] };
        dbo.collection("registerusers").find(query).toArray(function(err, result) {
        if (result[0]!=undefined){
          data.push(result[0]);

        }
        console.log(data);

        db.close();
        });
       
        });
        i++;
        }
        

console.log("===================");
console.log(data);
console.log("===================");

res.render('assetdetails.ejs', {detailss:state.details1,address:address3,listofaddresses:data,city:city});
data.length=0;

  })
 })








 app.post('/staylogin',function(req,res){
  var address1 = req.body.addressdata;
  var city1 = req.body.city;
  console.log(address1+"=================================>addres this is from stayloin ");
  console.log(city1+"=================================> city this is from stayloin ");
  var s = {
    status: 'valid',
    validAddress:address1,
    invalidAddress:"validaddrss2",
    rejectAddres:"validaddrss3",
    Branchname:city1
};
 multichain.getAddressBalances({
  address:address1
}).then(assertraw=>{
  console.log(assertraw);
  res.render('asset3.ejs', {assertrawb:assertraw,userdetailss:s});

})
})







app.post('/loginweb',function(req,res){
  var  phonenumber =req.body.phonenumber;
  var  password =req.body.password;
  
    var up={
      'phonenumber':phonenumber,
      'password':password
    }
  console.log(up);
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("user_crud1");
    dbo.collection("registerusers").findOne(up, function(err, result) {
      if (result){
      console.log('valid');
  
      var resup=result;
      var validaddrss1=result.blockchainaddress1;
      var validaddrss2=result.blockchainaddress2;
      var validaddrss3=result.blockchainaddress3;
      var city=result.Branchname;

      console.log(validaddrss1);
      if(resup){
        var s = {
          status: 'valid',
          validAddress:validaddrss1,
          invalidAddress:validaddrss2,
          rejectAddres:validaddrss3,
          Branchname:city
  };
  multichain.getAddressBalances({
    address : validaddrss1
  }).then(assertraw=>{
    console.log(assertraw);
    console.log(s)
    res.render('asset3.ejs', {assertrawb:assertraw,userdetailss:s});
  
  })
  

      }
    }else{
      console.log('failed');
      console.log("invalid password or phone number");
      res.redirect('/loginuser');
    }
      db.close();
    });
  });


})








app.post('/assetstransfer',function(req,res){
  console.log(req.body.fromaddress);
var fromaddress=req.body.fromaddress;
var assetname= req.body.assetname;
var toaddressunsplit=req.body.toaddress;
var address1 = req.body.addressdata;
var city1 = req.body.city;
console.log(address1+" ==================================>this is from assetstransfer from other page ")
console.log(city1+" ==================================>this is from assetstransfer from other page ")

console.log('save');
console.log(fromaddress);
console.log(assetname);
var sa=toaddressunsplit.split("-");
var toaddress = sa[1];
console.log(toaddress);
var numberr=1;
multichain.sendAssetFrom({from: fromaddress, to: toaddress, asset: assetname,qty:1}, (err, tx) => {
  console.log(tx);
  var g= tx;
  
  res.render('txid.ejs',{txid:g,address:address1,city:city1});

})

})
 

 






app.post('/api/me', function(req, res){
  console.log("im in me method");
  console.log(JSON.stringify(req.body));
  var cope = req.body;
  console.log(cope);
  var t=cope;
  var uid=cope.uid;
  var parentaddress=cope.validAddress;
  console.log("==================================> "+uid);
  console.log("==================================> "+parentaddress);

 var numberr=1;
 var MongoClients = require('mongodb').MongoClient;
 var link4 = "mongodb://localhost:27017/";
 
 MongoClients.connect(link4, function(err, db) {
   if (err) throw err;
   var dbo = db.db("user_crud1");
   dbo.collection("users").insertOne(t, function(err, res) {
     if (err) throw err;
     console.log("1 document inserted");
     multichain.issue({address: parentaddress, asset: uid, qty: numberr,units:numberr,
     details: t}, (err, res) => {
         console.log(res);
         console.log("sucessfully asset created in blockchain");
        multichain.subscribe({"asset":uid}).then(res=>{
console.log(res+'4658');
if(res==null){
  console.log("im in subscribe method");
}
        }).catch(err=>{
          console.log(err);   
        });
         

     });
     db.close();
   });
   var s={ status: 'productdatainserted'};
  return res.json(s);
 });

});










app.get('/api/register/:reg',function(req,res){
var gi = req.params.reg;
console.log(gi);
var gii=gi.split(",");

console.log("this is from prat system "+gii[2]);
console.log("TEST: GET NEW ADDRESS");
multichain.getNewAddress()
.then(address => {
    assert(address, "Could not get new address")
   console.log(address);
    state.address1 = address;
    console.log(state.address1);
multichain.getNewAddress()
.then(addresss => {
    assert(address, "Could not get new address")
   console.log(addresss);
    state.address2 = addresss;
    console.log('2nd arr'+state.address2);
    console.log("TEST: VALIDATE ADDRESS")
    multichain.getNewAddress()
.then(addresss => {
    assert(address, "Could not get new address")
   console.log(addresss);
    state.address3 = addresss;
    console.log('3nd arr'+state.address3);
    console.log("TEST: VALIDATE ADDRESS")
   if(state.address3){

    multichain.grant({
      addresses: state.address1,
      permissions: "send,receive,create,issue"
      })

      multichain.grant({
        addresses: state.address2,
        permissions: "send,receive"
        })


        multichain.grant({
          addresses: state.address3 ,
          permissions: "send,receive"
        })





      var MongoClient = require('mongodb').MongoClient;
var link5 = "mongodb://localhost:27017/";

MongoClient.connect(link5, function(err, db) {
  if (err) throw err;
  var a={'username':gii[0],'Branchname':gii[1],'phonenumber':gii[2],'password':gii[3],'blockchainaddress1':state.address1,'blockchainaddress2':state.address2,'blockchainaddress3':state.address3 }
  var dbo = db.db("user_crud1");
  
  dbo.collection("registerusers").insertOne(a, function(err, result) {
    if (err) throw err;
var u = result;
if(u){
  console.log("inserted");
  
  var s = {
                 status: 'inserted' 
        };
       return res.json(s);
}
    console.log("1 document inserted");
    


    db.close();
  });
});
    
   }else{
     console.log("address not came..")
   }
    return multichain.validateAddress({address: state.address1})
})
})
})
});







app.get('/api/login/:uid',function(req, res){
var q=req.params.uid;
console.log(q);
var mainstr= q.split("&");
  var phonenumber=mainstr[0];
  var password=mainstr[1];
  var up={
    'phonenumber':phonenumber,
    'password':password
  }
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("user_crud1");
  dbo.collection("registerusers").findOne(up, function(err, result) {
    if (err) throw err;
    console.log('valid');

    var resup=result;
    var validaddrss1=result.blockchainaddress1;
    var validaddrss2=result.blockchainaddress2;
    var validaddrss3=result.blockchainaddress3;
    console.log(validaddrss1);
    if(resup){
      var s = {
        status: 'valid',
        validAddress:validaddrss1,
        invalidAddress:validaddrss2,
        rejectAddress:validaddrss3
};
return res.json(s);
    }
    else{
      var s = {
        status: 'invaliddatafromregiter',
};
return res.json(s);
    }
    db.close();
  });
});
})


app.post('/api/newscan',function(req,res){

  console.log("im in me newscan");
  console.log(JSON.stringify(req.body));
  var cope = req.body;
  console.log(cope);
  var validAddress=cope.validAddress;
  console.log(validAddress);
  var invalidAddress=cope.invalidAddress;
  console.log(invalidAddress);
  var rejectAddress=cope.rejectAddress;
  console.log(rejectAddress);
  var data=cope.data;
  console.log(data);
  var uid=cope.uid;
  console.log(uid);
var q={uid:uid};

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("user_crud1");
  dbo.collection("users").findOne(q, function(err, result) {
    if (result){
      console.log(result.uid);
    if(data=="SECURED"){
multichain.listAssets({asset:uid}).then(res789=>{
  console.log(res789);
  if(res789){
    console.log("verifyed with blockchain");
    console.log("it is valid");
    var s = {
      message: 'blockchainrecordfound'
};
return res.json(s);


    }

}).catch(err => {
  console.log("this is from catch");

  console.log(err);
  if(err.code === -708){
    console.log("it is not a valid record in blockchain");
    var s = {
      message: 'blockchainrecordnotfound'
};
return res.json(s);

  }

})
    }else{



      var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("user_crud1");
  var newvalues = {$set: {onscan: "tamper at this address "+ validAddress} };
  dbo.collection("users").updateOne(q, newvalues, function(err, res560) {
    if (res560){
    console.log(" address updated");
  

      console.log("uid is found in mongobd but the cover is opened")
      multichain.listAssets({asset:uid}).then(res893=>{
        console.log(res893);
        if(res893){
          console.log("verifyed with blockchain but tamper");
console.log(validAddress);
console.log(invalidAddress);
console.log(uid);
          multichain.sendAssetFrom({from:validAddress , to:invalidAddress , asset: uid,qty:1}, (err, tx) => {
            console.log(tx);
            if(tx){
              var s = {
                           message: 'blockchainrecordfoundbuttamper'
                  };
                  return res.json(s);
            }
            else{
              var s = {
                              message: 'assetnotfoundinyouraddress '
                      };
                      return res.json(s);
            }
          
          })


      
      
          }
      }).catch(err => {
        console.log(err)
        if(err.code === -708){
          console.log("it notvalid in blockchain and tamper");
          var s = {
            message: 'blockchainrecordnotfoundandtamper'
      };
      return res.json(s);
      
        }
      
      })
    }
    db.close();
  });
});
    }





    }else{
      console.log("it is invalid");
      var s = {
        message: 'notok'
};
return res.json(s);

    }
    
    db.close();
  });
});

})










app.listen(8090);
