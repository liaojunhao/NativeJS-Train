/*
*
* 功能描述：时间字符串格式化
*
* */

//方法一
String.prototype.myFormatTime = function myFormatTime() {
    var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?: +)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?$/g,
        ary = [];
    this.replace(reg, function () {
        ary = ([].slice.call(arguments)).slice(1, 7);
    });
    var format = arguments[0] || "{0}年{1}月{2}日{3}:{4}:{5}";
    return format.replace(/{(\d+)}/g, function () {
        var val = ary[arguments[1]];
        return val.length === 1 ? "0" + val : val;
    });
};

var str = "2016-5-23 18:24:6";
console.log(str.myFormatTime("{0}年{1}月{2}日"));
console.log(str.myFormatTime("{1}-{2}"));
console.log(str.myFormatTime("{0}年{1}月{2}日 {3}:{4}:{5}"));


//方法二：少写点正则
String.prototype.myFormatTime = function(template) {
    var res = null,
        ary = this.match(/\d+/g);
    template = template || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
    res = template.replace(/\{(\d+)\}/g, function () {
        var val = ary[arguments[1]];
        !val ? val = "00" : null;
        val.length < 2 ? val = "0" + val : null;
        return val;
    });
    return res;
}
