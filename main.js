


const word = require("./controllers/word")
const { sleep } = require("./util/util")


let reqUri = [
  // 学术堂 > 毕业论文 > 本科毕业论文 > 工商企业管理毕业论文STR
  "http://www.lunwenstudy.com/biyelunwen/gsqygl/",
  "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_2.html",
  "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_3.html",
  "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_4.html",
  "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_5.html",
  "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_6.html",
  "http://www.lunwenstudy.com/biyelunwen/gsqygl/list_970_7.html",
  // 学术堂 > 毕业论文 > 本科毕业论文 > 工商企业管理毕业论文END

]
initBootstrap()
async function initBootstrap() {
  await initWord()
}

async function initWord() {
  for (let i = 0; i < reqUri.length; i++) {
    await sleep()
    word(reqUri[i])
  }
}