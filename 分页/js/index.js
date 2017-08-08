var pageRender = (function () {
    var n = 1,
        total = 0;
    var oBox = document.getElementById('box'),
        content = document.getElementById('content'),
        footer = document.getElementById('footer'),
        numBox = document.getElementById('numBox'),
        pageNum = document.getElementById('pageNum');

    //->bindHTML：实现页面的数据绑定以及其他的数据绑定
    function bindHTML() {
        //->回调函数
        function callback(result) {
            if (!result) return;
            total = parseInt(result['total']);// 获取页面的总页数
            var data = result['data'],
                str = '';
            for (var i = 0, len = data.length; i < len; i++) {
                var cur = data[i];
                str += '<li data-id="' + cur['ID'] + '">';
                str += '<span>' + cur['ID'] + '</span>';
                str += '<span>' + cur['name'] + '</span>';
                str += '<span>' + (cur['sex'] == 1 ? '女' : '男') + '</span>';
                str += '<span>' + cur['score'] + '</span>';
                str += '</li>';
            }
            content.innerHTML = str;
            //->设置页面的总页数
            str = '';
            for (i = 1; i <= total; i++) {
                if (i == n) {
                    str += '<li class="bg">' + i + '</li>';
                    continue;
                }
                str += '<li>' + i + '</li>';
            }
            numBox.innerHTML = str;
            //->设置输入框中的值，就是当前页的值
            pageNum.value = n;
        }

        //->用ajax发送请求获取数据
        ajax({
            url: '/getList?n=' + n,
            type: 'GET',
            dataType: "JSON",
            cache: false,
            success: callback //成功后执行回调函数
        });
    }

    //->bindEvent：事件委托实现分页区域的按钮操作
    function bindEvent() {
        oBox.onclick = function (ev) {
            ev = ev || window.event;
            var tar = ev.target || ev.srcElement,
                tarTag = tar.tagName.toUpperCase(),
                tarInn = tar.innerHTML,
                tarParent = tar.parentNode,
                tarGrandparent = tarParent.parentNode;
            //->点击的对象必须是在id为content下面的 li 和 span 标签
            if ((tarTag === 'LI' && tarParent.id === 'content') || (tarTag === 'SPAN' && tarGrandparent.id === 'content')) {
                if (tarTag === 'SPAN') {
                    tar = tarParent;
                }
                var id = tar.getAttribute('data-id');// 获取当前点击对象的自定义属性data-id的值
                //window.location.href = 'detail.html?id=' + id;
                window.open('detail.html?id=' + id);// 跳转到对于的详情页面
                return;
            }
            //->点击的对象是 li 标签并且它的父级节点的id为numBox
            if (tarTag === 'LI' && tarParent.id === 'numBox') {
                tarInn = parseInt(tarInn);
                if (tarInn === n) {
                    return;
                }
                n = tarInn;
                bindHTML();
                return;
            }

            //->footer 下面的上一页、下一页、第一页、最后一页的 SPAN 绑定
            if (tarTag === 'SPAN' && tarParent.id === 'footer') {
                if (tarInn === 'FIRST') {
                    if (n === 1) {
                        return;
                    }
                    n = 1;
                }
                if (tarInn === 'LAST') {
                    if (n === total) {
                        return;
                    }
                    n = total;
                }
                if (tarInn === 'PREV') {
                    if (n === 1) {
                        return;
                    }
                    n--;
                }
                if (tarInn === 'NEXT') {
                    if (n === total) {
                        return;
                    }
                    n++;
                }
                bindHTML();
            }
        }
    }
    return {
        //模块的入口，初始化设置
        init: function () {
            //->绑定数据
            bindHTML();
            //->绑定事件
            bindEvent();
            //->输入框输入页数跳转
            pageNum.onkeyup = function (ev) {
                ev = ev || window.event;
                //->回车键操作
                if (ev.keyCode === 13) { //ev.keyCode == 13：代表的是回车键
                    var val = parseFloat(this.value);
                    if (isNaN(val) || val === n) {
                        this.value = n;
                        return;
                    }
                    n = val < 1 ? 1 : (val > total ? total : val);
                    bindHTML();
                }
            }
        }
    }
})();
pageRender.init();