var cookie = {
    add: function(key, val, h) {
        var str = key + "=" + escape(val);
        // 如果h为0的时候，就是不设置过期时间，浏览器关闭的时候cookie自动删除
        if (h > 0) {
            var date = new Date();
            var ms = h * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();//根据格林威治时间(GTM)把Date对象转换为字符串
        }
        document.cookie = str;
    },
    get: function(key) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == key) {
                return unescape(temp[1]);
            }
        }
    },
    del: function(key) {
        var date = new Date();
        date.setTime(-10000);
        document.cookie = key + "=a; expires=" + date.toGMTString();
    },
    getAll: function() {
        var str = document.cookie;
        var arr = document.cookie.split("; ");
        var valArr = [];
        if (!str) {
            console.log("您没有保存任何Cookie");
        }
        else
        {

            for(var i = 0; i < arr.length; i++) {
                var temp = arr[i].split("=");
                valArr.push("Key:" + temp[1] + ", Val:" + unescape(temp[1]));
            }
            return valArr;
        }
    }
};

export default cookie