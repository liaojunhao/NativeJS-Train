//->加载页面的第一件事情就是获取URL地址栏后面问号传递过来的参数值
function queryURLParameter(url) {
    //url = url || decodeURIComponent(window.location.href);//->不传递URL我们就获取当前页面的URL地址
    url = url || window.location.href;
    var obj = {},
        reg = /([^?&=]+)=([^?&=]+)/g,
        res = reg.exec(url);
    while (res) {
        obj[res[1]] = res[2];
        res = reg.exec(url);
    }
    return obj;
}

var obj = queryURLParameter();