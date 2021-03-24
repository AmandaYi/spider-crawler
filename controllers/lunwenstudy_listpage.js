// 根据当前栏目页面找到,当前页面的所有的下一页的url


const Crawler = require("crawler");
let c = null
// 栏目的第一页的url
// let listPageUrl = "http://www.lunwenstudy.com/mba/mbaxttm/"
function getListPageUrl(listPageUrl = "http://www.lunwenstudy.com/mba/mbaxttm/") {

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
      uri: listPageUrl,
      callback: function (error, res, done) {
        if (error) {
          console.log(error);
          reject(error)
        } else {
          // 得到全部的当前页面的内容,然后把分页里面的内容 
          // 返回一个栏目页面
          resolve(formatAllListPage(res.$, res.body, res, listPageUrl))
        }
        done();
      }
    }]);
  })
}

function formatAllListPage($, body, res, listPageUrl) {
  let wordConfigUrl = [listPageUrl]
  $(".pd_c_xslb_left_fenye ul li a").each(function () {
    // console.log($(this).text())
    let t = $(this).text()
    if (Number.isInteger(Number(t))) {
      let href = $(this).attr('href')
      if (href.indexOf("www.lunwenstudy.com") > -1) {
        wordConfigUrl.push(href)

      } else {
        wordConfigUrl.push(listPageUrl + href)
      }
    }
  })
  return wordConfigUrl
}
module.exports = {
  getListPageUrl
}