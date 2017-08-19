/*
*
* 功能描述：时间字符串格式化
*
* */

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