# 原生编写的DOM库

**listToArray**

> * 将类数组转换成数组

```javascript
function listToArray(likeAry) {
try {
return [].slice.call(likeAry, 0);
} catch (e) {
var ary = [];
for (var i = 0; i < likeAry.length; i++) {
ary[ary.length] = likeAry[i]
}
return ary;
}
}
```

**toJSON**
> * 将JSON格式字符串转化成JSON对象

```javascript
function toJSON(str) {
return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
}
```

**getWin**
> * 获取屏幕的宽度，只有attr为获取，有value表示设置值

```javascript
function getWin(attr, value) {
if (typeof  value == "undefined") {
return document.documentElement[attr] || document.body[attr];
}
document.documentElement[attr] = value;
document.body[attr] = value;
}
```

**getCss**
> * 获取当前元素的CSS属性值

```javascript
function getCss(ele, attr) {
var res = null, reg = null;
if ("getComputedStyle" in window) {
res = window.getComputedStyle(ele, null)[attr]
} else {
if (attr == "opacity") {
res = ele.currentStyle["filter"];//alpha(opacity = 50.5)
reg = /alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)/;
res = reg.test(res) ? RegExp.$1 / 100 : 1;
} else {
res = ele.currentStyle[attr];
}
reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/;
return reg.test(res) ? parseFloat(res) : res;
}
}
```

**offset**
> * 获取当前元素到body的top和left的偏移量

```javascript
function offset(ele) {
var l = ele.offsetLeft;
var t = ele.offsetTop;
var p = ele.offsetParent;
while (1) {
if (!p || p == document.body) break;
if (navigator.userAgent.indexOf("MSIE 8.0") == -1) {
l += p.clientLeft;
t += p.clientTop;
}
l += p.offsetLeft;
t += p.offsetTop;
p = p.offsetParent;
}
return {l: l, t: t};
}
```

**getChildren**
> * 获得子元素节点,并且可以通过标记名指定子元素

```javascript
function getChildren(ele, tagName) {
var children = ele.childNodes;
var ary = [];
if (typeof tagName == "undefined") {
for (var i = 0; i < children.length; i++) {
var curChild = children[i];
if (curChild.nodeType == 1) {
ary.push(curChild);
}
}
} else if (typeof tagName == "string") {
for (var i = 0; i < children.length; i++) {
var curChild = children[i];
if (curChild.nodeType == 1 && curChild.nodeName.toLowerCase() == tagName.toLowerCase()) {
ary.push(curChild);
}
}
} else {
throw new Error("第二个参数类型错误");
}
return ary;
}
```

**pre**

> * 获取当前元素的哥哥元素节点，最多只返回一个

```javascript
function pre(ele) {
if (ele.previousElementSibling) {
return ele.previousElementSibling;
}
var prev = ele.previousSibling;
while (prev) {
if (prev.nodeType == 1) {
return prev;
}
prev = prev.previousSibling;
}
return prev;
}
```

**preAll**

> * 获取当前元素所有的哥哥元素节点

```javascript
function preAll(ele) {
var prev = pre(ele); //哥哥元素节点
var ary = [];
while (prev) {
ary.push(prev);
prev = pre(prev);//再基于哥哥节点再去找哥哥节点
}
return ary;
}
```

**next**
> * 获取当前元素的弟弟元素节点，最多只返回一个


```javascript
function next(ele) {
if (ele.nextElementSibling) {
return ele.nextElementSibling;
}
var nextNode = ele.nextSibling;
while (nextNode) {
if (nextNode.nodeType == 1) {
return nextNode;
}
nextNode = nextNode.nextSibling;
}
return nextNode;
}
```

**nextAll**
> * 获取当前元素的所有弟弟元素节点


```javascript
function nextAll(ele) {
var nextNode = next(ele);
var ary = [];
while (nextNode) {
ary[ary.length] = nextNode;
nextNode = next(nextNode);
}
return ary;
}
```

**sibling**
> * 返回当前元素相邻的兄弟节点:一个哥哥元素节点,一个弟弟元素节点
> * 旧的版本是写了两个方法的，DOM.next(ele)和DOM.previous(ele)，一个获取哥哥元素，一个获取弟弟元素，针对这个优化了一下把他两合并成了一个方法

```javascript
function sibling(ele) {
var ary = [];
//首先判断哥哥元素节点(弟弟元素节点是否存在),存在的话就放在数组里
var prev = pre(ele);
var nextNode = next(ele);
prev ? ary.push(prev) : null;
nextNode ? ary.push(nextNode) : null;
return ary;
}
```

**siblings**
> * 获得所有的兄弟节点
> * 旧版本中也是写了两个方法，DOM.nextsiblings(ele)和DOM.previousSiblings(ele)，优化后的版本两个方法合成一个方法

```javascript
function siblings(ele) {
return preAll(ele).concat(nextAll(ele));
}
```

**firstChild**
> * 获得第一个子元素节点

```javascript
function firstChild(ele) {
var childNodes = getChildren(ele);
return childNodes.length > 0 ? childNodes[0] : null
}
```

**lastChild**
> * 获得最后一个子元素节点

```javascript
function lastChild(ele) {
var childNodes = getChildren(ele);
return childNodes.length > 0 ? childNodes[childNodes.length - 1] : null
}
```

**prepend**
> * 把newEle添加到container的起始位置

```javascript
function prepend(newEle, container) {
//先判断下是否有第一个子元素节点,如果有,则添加到第一个子元素节点之前,如果没有,则添加到末尾的位置
var first = firstChild(container);
first ? container.insertBefore(newEle, first) : container.appendChild(newEle);
}
```

**insertAfter**
> * 把newEle插入到oldEle之后

```javascript
function insertAfter(newEle, oldEle) {
//首先获得oldEle之后的元素节点,如果存在,则插入其之前,如果不存在,则插入到最后的最后的位置
var nextEle = next(oldEle);
if (nextEle) {
oldEle.parentNode.insertBefore(newEle, nextEle)
} else {
oldEle.parentNode.appendChild(newEle);//插入到oldEle父节点(容器)末尾位置
}
}
```

**hasClass**
> * 判断元素是否有这个类名
> * 这个方法主要是配合addClass()来使用，作用是判断有没有类名

```javascript
function hasClass(ele,strClass){
var reg = new RegExp("(^| +)"+strClass+"( +|$)","g");
return reg.test(ele.className);
}
```

**addClass**
> * 给当前元素填写一个类名
> * 依赖于hasClass来判断有没有相同的类名存在，有相同类名就不生效，没有就添加

```javascript
function addClass(ele,strClass){
var aryName = className.replace(/(^ +| +$)/g, "").split(/ +/g);
for (var i = 0; i < aryName.length; i++) {
if (!hasClass(ele, aryName[i])) {
ele.className += " " + aryName[i];
}
}
}
```

**removeClass**
> * 给当前元素移除类名

```javascript
function removeClass(ele,strClass){
var aryName = strClass.replace(/(^ +| +$)/g,"").split(/ +/g);
for(var i = 0;i<aryName.length;i++){
var curName = aryName[i];
var reg = new RegExp("(^| +)"+curName+"( +|$)","g");
if(reg.test(ele.className)){
ele.className = ele.className.replace(reg," ");
}
}
}
```

# 总结
> * 总共18个方法（会持续更新），基本满足了我对DOM的操作，而且代码非常的轻非常小，后期我在写一个ajax库，就可以基本不用jquery了。

```
listToArray
toJSON
getWin
getCss
offset
getChildren
pre
preAll
next
nextAll
sibling
siblings
firstChild
lastChild
prepend
insertAfter
addClass
removeClass
```



