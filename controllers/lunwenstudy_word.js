const Crawler = require("crawler");



const w = require("../model/word")
const path = require("path")
const { sleep } = require("./../util/util")
let c = null
function word(uri = "") {
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
  c.queue([{
    uri: uri,
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        formatList(res.$, res.body, res)
      }
      done();
    }
  }]);
}
// 得到列表信息
function formatList($, body, res) {
  let listTitleUrl = []
  $(".wz_liebiao .title a").each(function () {
    let href = $(this).attr('href')
    if (href.indexOf("www.lunwenstudy.com") > -1) {
      listTitleUrl.push(href)

    } else {
      listTitleUrl.push("http://www.lunwenstudy.com" + href)

    }
  })

  // getContent(listTitleUrl[0])

  // 请求
  listTitleUrl.forEach(item => {
    getContent(item)
  })
}




function getContent(url) {
  c.queue({
    uri: url,
    callback(error, res, done) {
      if (error) {
        console.log(error)
      } else {
        // 得到标题和内容信息
        let $ = res.$
        let title = $(".neirong_title h1").text()
        let textList = []
        $(".neirong_text p").each(function () {
          textList.push($(this).text().replace(/\r|\n|\t|/igm, "").replace(' ', ""))
        })
        formatWord(title, textList)
        // formatWordWith(title, textList)
      }
    }
  })
}

// 处理成word
function formatWord(title, textList) {
  // 文件保存的路径
  let dirPath = `${path.join(__dirname, "..", "public", "uploads", "/lunwenstudy/")}`
  let filename = `2021${title}范文.docx`
  // 文件的标题
  let wTitle = `2021${title}范文`
  // 文件的内容
  let wTextRunList = []
  for (let i = 0; i < textList.length; i++) {
    if (textList[i].indexOf("参考文献") > -1) {
      break
    }
    wTextRunList.push(textList[i])
  }
  w.genFile(w.genWord(wTitle, wTextRunList), dirPath, filename)
}

// // 处理成word
// function formatWordWith(title, textList) {
//   // 文件保存的路径
//   let filepath = `${path.join(__dirname, "..", "public", "uploads", "/wenxian/")}2021${title}范文.doc`
//   // 文件的标题
//   let wTitle = `2021${title}范文`
//   // 文件的内容
//   let wTextRunList = textList
//   w.genFile(w.genWord(wTitle, wTextRunList), filepath)
// }


const config = [
  // 学术堂 > 毕业论文 > 本科毕业论文 > 工商企业管理毕业论文STR
  // "http://www.lunwenstudy.com/biyelunwen/gsqygl/",
  // "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_2.html",
  // "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_3.html",
  // "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_4.html",
  // "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_5.html",
  // "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_6.html",
  // "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_7.html",
  // 学术堂 > 毕业论文 > 本科毕业论文 > 工商企业管理毕业论文END

  // 学术堂 > 毕业论文 > mba论文 > mba论文选题与题目STR
  "http://www.lunwenstudy.com/mba/mbaxttm/",
  "http://www.lunwenstudy.com/mba/mbaxttm/list_891_2.html",
  "http://www.lunwenstudy.com/mba/mbaxttm/list_891_3.html",
  "http://www.lunwenstudy.com/mba/mbaxttm/list_891_4.html",
  "http://www.lunwenstudy.com/mba/mbaxttm/list_891_5.html",
  "http://www.lunwenstudy.com/mba/mbaxttm/list_891_6.html",
  "http://www.lunwenstudy.com/mba/mbaxttm/list_891_7.html",
  // 学术堂 > 毕业论文 > mba论文 > mba论文选题与题目END


]

async function init(index) {

  for (let i = 0; i < config.length; i++) {
    await sleep()
    word(config[i])
  }
}

module.exports = {
  init
}