const assert = require('assert');
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
    console.log("this is info");
})
// multichain.issue({address:"161BfQdTc55sa8JPXp1MntvmnuBVk5djpxCrex", asset: "tyud", qty: 1, units: 1, details: {hello: "world"}}, (err, res) => {
//     console.log(res)
// })



// multichain.listAssets()
// .then(assets=> {
// assert(assets);
// console.log("TEST: LIST ASSETS")
// console.log(assets);

// return multichain.listAssets({
// })

// })


  //  multichain.listAssets( deec2850e22ed0c837c270b36dd9c0b11b20df192b01bb1197bb21d72a964b02);

   // var ji="listAssets mo"
  


//   multichain.getMultiBalances({assets:["jtcoin"]}).then(res => { 
//       if(res){
//           console.log("good");
      
//        }
// })

// .catch(err => {
//     console.log(err)
//     if(err.code === -708){
//         console.log("hello im in catch1");

//     }
 
// })

    // multichain.getRawTransaction({txid: "8f15384bae3e31bff3f64cd88a63f05b913fea474a8a577af141adb09a8a4e07"}, (err, tx) => {

    //     multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
    //         console.log(dTx)
    //     })
    // })




    // let getConfirmations = (txid) => {
    //     return multichain.getWalletTransaction({
    //         txid: "01eed0a63dbc55e455c2e1efc6ef8e711fb23af908674163cc431d346e1f7cc6"
    //     })
    //     .then(res => {
    //         return res.confirmations;
    //     })
    // }
   
//   multichain.listAssets({name:"jtcoin"},(err, res) =>{
//     //   multichain.decodeAssets({"assetsstring":res},(err,result)=>{
//     //       console.log(result)
//     //   })
//       result res;
//   })

// multichain.listAssets().then(_ => {
//     console.log("TEST: LIST ASSETS")
//     return multichain.listAssets({
        
//     })
// })


//   multichain.({assets:["jtcoin"]}).then(res => { 
//       if(res){
//           console.log("good");
      
//        }
// })

// multichain.getAddresses((err, addresses) => {

//         console.log(addresses);
//         console.log("o element of array");
//    var ni=addresses[0];
//    console.log(ni);
// })
// var hi="jtcoin";
// multichain.listAssets().then(res=>{
    
//     console.log(res);
// })


// multichain.listAssets((err,ast)=>{
// var k=0;
// while(ast[k]){
//     if(ast[k].name=="GJ42"){
//    console.log( ast[k].details);
//     }
//    k++;
// }
// })

multichain.listAssets({asset:"GJ42"}).then(res=>{
    console.log(res);
})