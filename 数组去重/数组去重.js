/*
* 函数名称：Array.prototype.distinct
* 功能描述：牺牲空间换时间，利用自定义属性的方法去重
* 方法一
* */
Array.prototype.distinct = function () {
    var Obj = {};
    for (var i = 0; i < this.length;) {
        if (Obj[this[i]] != this[i]) {
            Obj[this[i]]=this[i];
            i++;
        } else {
            this.splice(i,1);
        }
    }
}

/*
* 函数名称：Array.prototype.distinct
* 功能描述：forEach方法去重
* 方法二
* */
Array.prototype.distinct = function () {
    var a=[],obj={},temp=this;
    temp.forEach(function (value, index, temp){
        if(!obj[typeof (value)+value])	{
            a.push(value);
            obj[typeof (value)+value]=true;
        }
    });
    return a;
}

/*
* 函数名称：multiTypeDistinct()
* 功能描述：解决对象去重问题
* 方法三
* */
function multiTypeDistinct (arr) {
    //判断对象类型的方法
    function isEqual(obj1,obj2){
        //判断两个对象的地址是否一样，地址一样则必相等，这里只为了优化性能
        if(obj1===obj2){
            return true;
        }
        if(typeof(obj1)=="object"&&typeof(obj2)=="object"){
            //判断两个对象类型一致且为object类型
            var count=0;
            for(var attr in obj1){
                count++;
                if(!isEqual(obj1[attr],obj2[attr])){
                    return false;
                }
            }
            for(var attr in obj2){
                count--;
            }
            return count==0;
        }else if(typeof(obj1)=="function"&&typeof(obj2)=="function"){
            //判断两个对象类型一致且为function类型
            if(obj1.toString()!==obj2.toString()){
                return false;
            }
        }else {	//判断两个对象类型不一致，再判断值是否相等
            if(obj1!=obj2){
                return false;
            }
        }
        return true;
    };
    //temp作为传入数组arr的备份，在不改变原数组的基础上进行去重操作
    var temp=arr.slice(0);
    for(var i=0;i<temp.length;i++){
        for(j=i+1;j<temp.length;j++){
            if(isEqual(temp[j],temp[i])){
                temp.splice(j,1);//删除该元素
                j--;
            }
        }
    }
    return temp;
}

/*
* 函数名称：stringDist()
* 功能描述：字符串转换成数组去重（字符串去重）
* 方法四
* */
var str='777748908883859999';
function stringDist(str){
    var arr = [].slice.call(str,0);
    var obj={},a=[];
    for(var i=0,len=arr.length;i<len;i++){
        var temp=arr[i];
        if(!obj.hasOwnProperty(temp)){	//判断obj对象是否具有temp属性
            obj[temp]=1;
            a.push(temp);
        }else{
            obj[temp]++;
        }
    }
    return a.toString().replace(/,/g,'');
    //return obj;	//返回每一项及其重复的个数
}
console.log(typeof stringDist(str))