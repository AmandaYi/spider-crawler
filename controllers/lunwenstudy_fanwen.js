// http://www.lunwenstudy.com/fanwen/
// 抓取按照分类的里面的全部url

const fs = require("fs")
const path = require("path")

const Crawler = require("crawler");
let c = null
function getFanWenUrl() {

  let fanwen = "http://www.lunwenstudy.com/fanwen/"
  c = new Crawler({
    maxConnections: 11,
    callback: (err, res, done) => {
      if (err) {
        console.log(err)
      } else {
        console.log("OK")
      }
      done()
    }
  })
  return new Promise((resolve, reject) => {
    c.queue([{
      uri: fanwen,
      callback: function (error, res, done) {
        if (error) {
          console.log(error);
          reject(error)
        } else {
          // 得到全部的tag
          resolve(formatAllTag(res.$, res.body, res))
        }
        done();
      }
    }]);
  })
}
function formatAllTag($, body, res) {
  let tagListUrl = []
  $(".pd_c_fanwen_fl .pd_c_fanwen_fl_list ul li:not([class]) a")
    .each(function () {
      let href = $(this).attr("href")
      if (href.indexOf("www.lunwenstudy.com") > -1) {
        tagListUrl.push(href)

      } else {
        tagListUrl.push("http://www.lunwenstudy.com" + href)
      }
    })

  return tagListUrl
}

// 整合全部的栏目的url到一个json文件里面
function writeListPageUrl(configList = []) {

  let bufferList = JSON.stringify(configList, null, 2)
  // 栏目的全部url
  let filename = "lunwenstudy_fanwen_list_page.json"
  fs.writeFileSync(path.join(__dirname, filename), bufferList)
}








module.exports = {
  getFanWenUrl,
  writeListPageUrl
}