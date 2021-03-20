# Python处理文件
* 安装python
* 安装依赖
pip3 install -r requirements.txt

## 使用说明
删除: resultPath下内容
删除: docxPath下内容
删除: resultPath下内容
复制要处理的文件：targetPath下面，最好只放doc或者docx。（反正你放其他的也不处理！）

## 执行
打开命令行
执行命令
`python main.py`
按照提示开始处理。

执行完毕后文件会在resultPath文件下拿到

Authon 赵哲云





## 自定义开发
改过程序之后需要重新生成依赖文件
`pip install pipreqs`
`pipreqs ./ --encoding=utf-8`