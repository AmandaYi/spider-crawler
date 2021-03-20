const c = require("./../model/crawler")
const w = require("./../model/word")
const path = require("path")
function word(uri = "") {

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
    if(href.indexOf("www.lunwenstudy.com") > -1) {
      listTitleUrl.push( href)

    }else{
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
        formatWordWith(title, textList)
      }
    }
  })
}

// 处理成word
function formatWord(title, textList) {
  // 文件保存的路径
  let filepath = `${path.join(__dirname, "..", "public", "uploads", "/wuwenxian/")}2021${title}范文.docx`
  // 文件的标题
  let wTitle = `2021${title}范文`
  // 文件的内容
  let wTextRunList =  []
  for(let i = 0; i< textList.length ; i++) {
    if(textList[i].indexOf("参考文献") > -1) {
      break
    }
    wTextRunList.push(textList[i])
  }
  w.genFile(w.genWord(wTitle, wTextRunList), filepath)
}

// 处理成word
function formatWordWith(title, textList) {
  // 文件保存的路径
  let filepath = `${path.join(__dirname, "..", "public", "uploads", "/wenxian/")}2021${title}范文.docx`
  // 文件的标题
  let wTitle = `2021${title}范文`
  // 文件的内容
  let wTextRunList = textList
  w.genFile(w.genWord(wTitle, wTextRunList), filepath)
}

















module.exports = word