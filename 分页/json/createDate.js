function getRandom(n, m) {
    return Math.round(Math.random() * (m-n) + n)
}

var str1 = "赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏桃江"; //0-30
var str2 = "一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾"   // 0-19

var ary = []

for (var i=0; i<99; i++) {
    var obj = {};
    obj["id"] = i;
    obj["name"] = str1[getRandom(0, 30)] + str2[getRandom(0, 19)] + str2[getRandom(0, 19)]
    obj["sex"] = getRandom(0, 1);
    obj["score"] = getRandom(50, 99);
    ary.push(obj)
}

console.log(JSON.stringify(ary))