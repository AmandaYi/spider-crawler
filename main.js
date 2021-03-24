


const lunwenstudy_word = require("./controllers/lunwenstudy_word")
const lunwenstudy_fanwen = require("./controllers/lunwenstudy_fanwen")
const lunwenstudy_listpage = require("./controllers/lunwenstudy_listpage")
const { sleep } = require("./util/util")

// 基于范文页面初始化配置
lunwenstudy_word.initConfig();
// lunwenstudy_word.init();


// lunwenstudy_listpage.getListPageUrl().then(v=>{
//   console.log(v)
// })


// // 通过此得到全部的栏目的url配置
// lunwenstudy_fanwen.getFanWenUrl().then(tagList => {
//   //  得到全部tag
//   // console.log(tagList)
//   for

// })
// getListPageUrl


// lunwenstudy_fanwen.writeListPageUrl()

; (async () => {
  await sleep(9000000)
})()

