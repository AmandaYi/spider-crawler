const Crawler = require("crawler");

const c = new Crawler({
  // maxConnections: 11,
  rateLimit: 300,
  callback: (err,res,done)=>{
    if(err){
      console.log(err)
    }else{
      console.log("OK")
    }
    done()
  }
})

module.exports = c



















