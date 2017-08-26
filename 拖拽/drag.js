var oDiv = document.getElementById("div1");
//->不是刚加载页面就把mousemove、mouseup事件绑定方法,而是需要等用户按下去触发mousedown的时候在绑定，此时才是拖拽真正开始，同理需要在mouseup的时候把move or up绑定的方法移除掉
on(oDiv, "mousedown", down);
function down(ev) {
    //->记录鼠标和盒子的起始位置
    this["strX"] = ev.clientX;
    this["strY"] = ev.clientY;
    this["strL"] = this.offsetLeft;
    this["strT"] = this.offsetTop;

    on(this, "mousemove", move);
    on(this, "mouseup", up);
}
function move(ev) {
    //->随时计算鼠标的最新位置
    var curL = ev.clientX - this["strX"] + parseFloat(this["strL"]);
    var curT = ev.clientY - this["strY"] + parseFloat(this["strT"]);

    //->边界判断
    var minL = 0,
        maxL = (document.documentElement.clientWidth || document.body.clientWidth) - this.offsetWidth,
        minT = 0,
        maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.offsetHeight;
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);

    this.style.left = curL + "px";
    this.style.top = curT + "px";
}
function up(ev) {
    off(this, "mousemove", move);
    off(this, "mouseup", up);
}