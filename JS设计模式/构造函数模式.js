//      var obj1 = {};// 字面量方式
//      var obj2 = new Object();
var arr = new Array(1, 2, 3, 4);
console.log(arr);
//    内置类
//       Number,String,Boolean,null,undefined
//       Array,Object,Date,RegExp....
//    [] [123] Array
//    {} {name:'zhufeng'} Object;
//    构造函数目的 创建一个自定义类 并且创建这个类的实例
//    function personInfo(name, sex, hobby) {
//        var obj = {};
//        obj.name = name;
//        obj.sex = sex;
//        obj.hobby = hobby;
//        obj.say = function () {
//            console.log(this.name + '是一个' + this.sex + ', 他喜欢吃' + this.hobby);
//        };
//        return obj;
//    }
//    personInfo(name, sex, hobby)
//    function CreatePerson(name,age) {
////        执行之前浏览器默认会创建一个对象
//         var num = 123;
//         this.name = name;
//         this.age = age;
////       默认将这个对象返回
//    }
//      var person1 = new CreatePerson('zhufeng', 10); // 构造函数模式 执行 它的返回值就是这个类的实例
//      var person2 = new CreatePerson('liwenli', 18);
//    //  person1 和 person2  都是CreatePerson的实例
//        console.log(person1);
//        console.log(person2.name);
//    var person1 = CreatePerson('zhufeng', 10); // 普通函数执行
//    console.log(person1);
//    在类中的this.xxx 是给 当前实例添加属性 类中的this是当前实例
//      类本身也是个函数 类都是函数数据类型
//      实例是对象数据类型

//      工厂模式和构造函数模式区别
//      1. 工厂模式 普通函数执行 构造函数通过new 来执行 默认创建一个对象 将其返回作为这个类的实例
//      2. 执行的时候形成一个私有作用域 -> 形参赋值 -> 预解释 -> 代码 从上到下执行
//         不同 构造函数模式执行的时候 会默认创建一个对象 也就是默认返回的实例 工厂模式 自己手工创建

//    function CreatePerson(name,age) {
//        执行之前浏览器默认会创建一个对象
//        var num = 123;
//        this.name = name; // 给当前实例添加私有属性
//        this.age = age;
//        默认将这个对象返回
//    }
//
//    var person1 = new CreatePerson('nihao', 20);
//    console.log(person1);
//    var person2 = new CreatePerson('hello', 20);
//    console.log(person2 === person1);
//    每个实例都一个独立的个体
//    instanceof 用来检测一个实例是否属于这个类
//    console.log(person1 instanceof CreatePerson);
//    console.log(person2 instanceof CreatePerson);
//    var arr = new Array(1,2,3,3);
//    console.log(arr instanceof Array);
//    console.log(typeof arr);
//
//    Object基类
function CreatePerson(name, age) {
    var num = 123;
    this.name = name;
    this.age = age;
//        return {info: 'hello world'};
//        return 123;
//        return [100];
//        return 'hello world';
    return function () {
        console.log('nihao');
    }
}
//  构造函数模式执行的时候 如果指定返回的 是一个引用数据类型  那么返回的就是这个引用数据类型
//  在JS中所有的类都是函数数据类型的
var person1 = new CreatePerson('nihao', 20);
console.log(person1);