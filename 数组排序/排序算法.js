/*
*
* 1,冒泡排序
* 基本思路：
* 1) 依次比较相邻的两个数，如果第一个比第二个小，不变。如果第一个比第二个大，调换顺序。一轮下来，
* 2) 最后一个是最大的数对除了最后一个之外的数重复第一步，直到只剩一个数
* */

function bubbleSort(myArray){
    var len = myArray.length;
    var i;
    var j;
    var stop;

    for (i = 0; i < len - 1; i++){
        for (j = 0, stop = len - 1 - i; j < stop; j++){
            if (myArray[j] > myArray[j + 1]){
                swap(myArray, j, j + 1);
            }
        }
    }
    return myArray;
}

function swap(myArray, p1, p2){
    var temp = myArray[p1];
    myArray[p1] = myArray[p2];
    myArray[p2] = temp;
}

/*
*
* 2,快速排序
* 基本思路：
* 1) 以一个数为基准(中间的数)，比基准小的放到左边，比基准大的放到右边
* 2) 再按此方法对这两部分数据分别进行快速排序（递归进行）
* 3) 不能再分后退出递归，并重新将数组合并
* */

function quickSort(ary) {
    if (ary.length <= 1) {
        return ary;
    }
    var poinIndex = Math.floor(ary.length / 2);
    var poinValue = ary.splice(poinIndex, 1)[0];
    var left = []
    var right = []
    for (var i = 0; i < ary.length; i++) {
        var cur = ary[i];
        cur < poinValue ? left.push(cur) : right.push(cur)
    }
    return quickSort(left).concat([poinValue], quickSort(right))
}

/*
*
* 3,插入排序
* 基本思路：
* 1) 把数组分为[已排序]和[未排序]两部分,第一个数为[已排序]，其余为[未排序]
* 2) 从[未排序]抽出第一个数，和[已排序]部分比较，插入到合适的位置
* */

//第一种方式
function insertionSort(myArray) {
    var len     = myArray.length,     // 数组的长度
        value,                      // 当前比较的值
        i,                          // 未排序部分的当前位置
        j;                          // 已排序部分的当前位置

    for (i=0; i < len; i++) {
        // 储存当前位置的值
        value = myArray[i];
        /*
         * 当已排序部分的当前元素大于value，
         * 就将当前元素向后移一位，再将前一位与value比较
         */
        for (j=i-1; j > -1 && myArray[j] > value; j--) {
            myArray[j+1] = myArray[j];
        }

        myArray[j+1] = value;
    }
    return myArray;
}

//第二种方式
function insertSort(ary) {
    //-> newAry存储的是我左手已经抓取的牌
    var newAry = [];
    newAry.push(ary[0]); //先抓第一张牌
    // 依次把桌面上面的第二张及以后的牌抓到
    for (var i = 1; i < ary.length; i++) {
        var cur = ary[i]
        //-> 抓到当前的牌后，分别的从后往前和左手中的牌比较
        for (var j = newAry.length - 1; j >= 0;) {
            if (cur < newAry[j]) { //当前新抓的牌比左手中的newAry[j]这张牌小，继续和前面的牌比
                j--
                if (j === -1) {
                    newAry.unshift(cur);
                }
            } else { //当前新抓的牌比左手中的newAry[j]这张牌大，放在newAry[j]这张牌的后面，也相当于插入到newAry[j+1]这张牌的前面
                newAry.splice(j + 1, 0, cur)
                j = -1
            }
        }
    }
    return newAry
};

/*
*
* 4,选择排序
* 基本思路：
* 1) 找出最小的数，和第一个交换位置
* 2) 在剩下的数中，找出最二小的数，放在第二个
* 3) 依次类推，排出顺序
* */
function selectionSort(myArray){

    var len = myArray.length,
        min;

    for (i=0; i < len; i++){
        // 将当前位置设为最小值
        min = i;
        // 检查数组其余部分是否更小
        for (j=i+1; j < len; j++){
            if (myArray[j] < myArray[min]){
                min = j;
            }
        }
        // 如果当前位置不是最小值，将其换为最小值
        if (i != min){
            swap(myArray, i, min);
        }
    }
    return myArray;
}
function swap(myArray, p1, p2){
    var temp = myArray[p1];
    myArray[p1] = myArray[p2];
    myArray[p2] = temp;
}

/*
*
* 5,合并排序
* 基本思路：
* 1) 不断将数组对半分，直到每个数组只有一个
* 2) 将分出来的部分重新合并
* 3) 合并的时候按顺序排列
* */

// 被拆分的数组重新合并
function merge(left, right) {
    var result = [],
        left_index = 0,
        right_index = 0;
    // 将两个数组合并
    // 合并的时候按从小到大的顺序
    while (left_index < left.length && right_index < right.length) {
        if (left[left_index] < right[right_index]) {
            result.push(left[left_index++]);
        } else {
            result.push(right[right_index++]);
        }
    }
    // 和其他数组拼接
    return result.concat(left.slice(left_index)).concat(right.slice(right_index));
}

function mergeSort(myArray) {
    // 只有一个数的时候退出递归
    if (myArray.length < 2) {
        return myArray;
    }
    var middle = Math.floor(myArray.length / 2),
        left = myArray.slice(0, middle),
        right = myArray.slice(middle);
    // 递归
    // 不断拆分只到一个数组只有一个数
    return merge(mergeSort(left), mergeSort(right));
}