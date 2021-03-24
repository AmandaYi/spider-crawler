const fs = require("fs")
const path = require("path")
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Alignment, AlignmentType, ShadingType } = require("docx")

/**
 *@name 根据传入值生成word 
 *
 */
function genWord(wTitle = "", wTextRunList = []) {
  const doc = new Document({
    creator: "zzy",
    description: wTextRunList[0],
    title: wTitle,
    // background: {
    //   color: "000000",
    // },
    sections: [{
      children: [
        // 标题
        new Paragraph({
          // heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            bold: true,
            text: wTitle,
            size: 52,
            font: {
              name: '宋体',
              eastAsia: "宋体"
              // readonly ascii?: string;
              // readonly cs?: string;
              // readonly eastAsia?: string;
              // readonly hAnsi?: string;
              // readonly hint?: string;
            }
          })]
        }),
        ...wTextRunList.map(wT => {
          return new Paragraph({
            children: [new TextRun({
              text: wT,
              size: 24,
              font: {
                name: '宋体',
                eastAsia: "宋体"
                // readonly ascii?: string;
                // readonly cs?: string;
                // readonly eastAsia?: string;
                // readonly hAnsi?: string;
                // readonly hint?: string;
              }
            })]
          })
        }),
      ],
    }]
  });
  return doc
}
function genFile(doc, dirPath, filename) {
  // 文件路径
  fs.mkdirSync(path.join(dirPath), {recursive: true})
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(dirPath , filename), buffer);
    console.log("写入",path.join(dirPath , filename))
  });

}
const word = {
  genWord,
  genFile
}
module.exports = word