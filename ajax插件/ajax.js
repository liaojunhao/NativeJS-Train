/*
*
* @Name：ljhAjax v1.1 ajax插件
* @Author：andyjhl
* @Date：2017-02-10
*
* */

function createXHR() {
    var xhr = null;
    var flag = false;
    var ary = [
        function () {
            return new XMLHttpRequest();
        },
        function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        },
        function () {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }
    ];
    for(var i=0;i<ary.length;i++){
        var curFn = ary[i];
        try{
            xhr = curFn();
            createXHR = curFn;
            flag =true;
            return xhr;
        }catch(e){

        }
    }
    if(!flag){
        throw new Error("你的浏览器不支持ajax");
    }
}

function ajax(options) {
    // 初始化常用的参数
    var _default = {
        url : "",
        type : "get",
        dataType : "json",
        async : true,
        data : null,
        timeout : 1000,//请求超时
        success : null
    }
    for(var key in options){
        if(options.hasOwnProperty(key)){
            _default[key] = options[key];
        }
    }

    var xhr = createXHR();// 创建的ajax 的对象

    xhr.open(_default.type,_default.url,_default.async);

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)){
            var val = xhr.responseText;
            if(_default.dataType === "json"){
                val = "JSON" in window?JSON.parse(val):eval("("+val+")");
            }
            _default.success.call(xhr,val)
        }
    }
    xhr.send(_default.data);
}
