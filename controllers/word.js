const c = require("./../model/crawler")

 
function word() { 

  c.queue([{
    uri: 'http://www.lunwenstudy.com/biyelunwen/gsqygl/',
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
function formatList ($, body, res) {
  let listTitleUrl =  []
   $(".wz_liebiao .title a").each(function(){
    let href=$(this).attr('href')
    listTitleUrl.push("http://www.lunwenstudy.com"+href)
  })
    
  getContent(listTitleUrl[0])

  return
  // 请求
  listTitleUrl.forEach(item=>{
     getContent(item)
  })
}




function getContent ( url ) {
  console.log(url)
  c.queue({
    uri:url,
    callback(error, res,done){
      if(error){
        console.log(error)
      }else{
        // 得到标题和内容信息
        let $ = res.$
        let title = $(".neirong_title h1").text()
        let textList = []
        $(".neirong_text p").each(function(){
          textList.push( $(this).text().replace(/\r|\n|\t|/igm,"").replace(' ',"") )
        })
        formatWord(title, textList)
      }
    }
  })
}

// 处理成word
function formatWord ( title, textList) {
  console.log(title)
  console.log(textList)
}

















module.exports = word