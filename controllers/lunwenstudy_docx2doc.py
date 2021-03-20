import os
from docx import Document

import shutil
from docx.shared import Pt,RGBColor
from docx.oxml.ns import qn
from win32com import client as wc #导入模块

targetPath = os.getcwd() + "/public/uploads/lunwenstudy/targetPath/" # 最原始的位置
# docxPath = os.getcwd() + "/public/uploads/lunwenstudy/docxPath/" # 即将处理的全部文件
resultPath = os.getcwd() + "/public/uploads/lunwenstudy/resultPath/" # 生成好的文件
files = []
for file in os.listdir(targetPath):
  if file.endswith(".docx"):
     files.append(file)
    # shutil.copy(targetPath + file, docxPath + file)

print(files)

word = wc.Dispatch("Word.Application") 
for file in files:
  print(targetPath + file)
  doc = word.Documents.Open(targetPath + file)
  # https://docs.microsoft.com/zh-cn/office/vba/api/word.wdsaveformat
  doc.SaveAs(resultPath + "4.doc", 0)
  doc.Close()
word.Quit()