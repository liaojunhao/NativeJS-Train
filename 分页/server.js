var http = require("http"),
    url = require("url"),
    fs = require("fs")

var server1 = http.createServer(function (rep, res) {
    var urlObj = url.parse(rep.url , true),
        pathname = urlObj["pathname"],
        query = urlObj["query"];




})

server1.listen(88, function () {
    console.log("88端口监听成功")
})