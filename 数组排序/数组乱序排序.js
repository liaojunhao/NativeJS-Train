//数组乱序排序
var arr = [1,2,3,4,5,6,7,8]

function shuffle(a) {
    var b = [];
    while (a.length > 0) {
        var index = parseInt(Math.random() * (a.length - 1));
        b.push(a[index]);
        a.splice(index, 1);//把原数组对应索引上的那个值删掉
    }
    return b;
}

console.log(shuffle(arr))
console.log(shuffle(arr))