//    function fn() {
//         console.log('这是机票 方法');
//    }
//    fn();
//    function fn() {
//        console.log('火车票 方法');
//    }
//    fn();
//  var name = 'wenli';
//  var name = 'zhufeng';
//    单例模式:把描述同一个事物（或同一个对象）属性或方法放在一个内存空间 ，起到分组的作用（他非常常用，因为能够用他来做模块化开发）
//    即使属性名相同也不会相互影响

//    "模块化开发" ：项目中 开发模块比较多的时候，多人协作 每个人负责一个模块 最终将代码合在一起
//    单例模式中把flightFn和trainFn称为 "命名空间"
//    对象数据作用
//    var flightFn = {
//        title: '糯米机票',
//        mess: '欢迎你来到糯米机票购票',
//        say: function () {
//            alert('这个模块是' + this.title + ' ,' + this.mess);
//        }
//    };
//    flightFn.say();

//    var trainFn = {
//        title: '糯米火车票',
//        mess: '欢迎你来到糯米火车票购票',
//        say: function () {
//            alert('这个模块是' + this.title + ' ,' + this.mess);
//        }
//    };
//    trainFn.say();


//公共模块
var uitls = {
    date: function () {
        console.log(new Date);
    }
};

var flightTicket1 = {
    fn: function () {
        console.log('这是关于机票');
        uitls.date(); // 调用其他模块的功能
    },
    init: function () {
//            flightTicket1.fn();
        this.fn();  // 调用自己模块中的功能
    }
};
flightTicket1.init();

var busTicket = {
    fn: function () {
        console.log('这是关于汽车票');
        uitls.date(); // 调用其他模块的功能
    },
    init: function () {
        this.fn(); // 调用自己模块中的功能
    }
};
busTicket.init();

//->高级单例模式
var skinRender = (function () {
    var a = 12;
    return {
        fn: function () {
            utils.remove();
        }
    }
})();

//->单例模式是我们以后项目开发中业务逻辑编写最常用的设计模式：在业务逻辑相对复杂的时候，我们会基于单例模式引入“发布订阅模式”、“promise模式”...

//->构造原型模式是我们以后项目中封装类库、组件、插件、框架最常用的设计模式

//->单例模式：解决了变量冲突，实现了分类分组，在单例模式中我们的对象名叫做“命名空间”:单例模式把实现和描述同一件事物的属性和方法进行分类归纳，然后汇总的同一个命名空间下，不同的命名空间互不冲突

//    var personModule = {
//        name: '珠峰'
//    };
//
//    var studentModule = {
//        name: '哲楠'
//    };

//=>真实项目中我们实现模块化开发基本上都采用单例模式

