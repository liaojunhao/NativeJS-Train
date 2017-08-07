var http = require("http"),
    url = require("url"),
    fs = require("fs")

var server1 = http.createServer(function (rep, res) {
    var urlObj = url.parse(rep.url , true),
        pathname = urlObj["pathname"],
        query = urlObj["query"];

    //-> 静态资源(项目)文件的请求处理，服务器接受到具体的请求文件后，把文件中的源代码返回给客户端进行渲染即可
    var reg = /\.(html|css|js|ico)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = suffix === 'html' ? "text/html" : (suffix === 'css' ? "text/css" : "text/javascript");
        try {
            res.writeHead(200, {'content-type':suffixMIME + ' ;charset=utf-8;'});
            res.end(fs.readFileSync("." + pathname, "utf-8"))
        } catch (e) {
            res.writeHead(404);
            res.end("file is not found~");
        }
        return
    }

    //-> API数据接口文档中规定的数据请求处理
    var data = JSON.parse(fs.appendFileSync('./json/student.json', 'utf-8'))

    if (pathname === '/getList') {
        var n = query["n"],
            arr =[];
        for (var i = (n-1) * 10; i <= n * 10 - 1; i++) {
            //-> 通过规律计算的索引比最大的索引都要大，直接跳出即可，不需要在存储了（最后一页）
            if ( i > data.length-1 ) {
                break
            }
            arr.push(data[i])
        }
        res.writeHead(200, {'content-type':'applicaticon/json; charset=utf-8;'});
        res.end(JSON.stringify({
            code: 0,
            msg: "成功",
            total: Math.ceil(data.length/10),
            data: arr
        }))
        return
    }

})

server1.listen(88, function () {
    console.log("88端口监听成功")
})