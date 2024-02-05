<template>
    <div>
        <div style="position: absolute;">
            <button id="focus" @click="focusMode()">{{ tip }}</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

let tip = ref('Focus');

// 写一个快排
function quickSort(arr, left, right) {
    if (left < right) {
        let i = left;
        let j = right;
        let pivot = arr[i];
        while (i < j) {
            while (i < j && pivot <= arr[j]) {
                j--;
            }
            arr[i] = arr[j];
            while (i < j && pivot >= arr[i]) {
                i++;
            }
            arr[j] = arr[i];
        }
        arr[i] = pivot;
        quickSort(arr, left, i - 1);
        quickSort(arr, i + 1, right);
    }
}

var last_element = null;

var last_rect = null;

var lastTop = null;

var isScroll = false;


var notShowSet = new Set(['html', 'h1']);

var contentRect = null

var contentElement = null

let flag = false;

var mousemoveEvent = null;

var focusButton = null;

const focusMode = () => {
    if (!flag) {
        focusButton = document.querySelector('#focus')
        focus(focusButton)
        last_element = focusButton
        //  z-index: 170 !important
        contentElement.setAttribute('style', 'overflow: visible !important;');
        window.addEventListener('mousemove', track_mouse)
    } else {
        contentElement.setAttribute('style', '');
        window.removeEventListener('mousemove', track_mouse)
        removeFocus(last_element)
    }
    flag = !flag
}

onMounted(() => {
    contentElement = document.querySelector('.theme-hope-content');
    contentRect = document.querySelector('.theme-hope-content').getBoundingClientRect();
    // document.documentElement.style.setProperty(`--text-color`, 'var(--theme-font-color-dark)');
    // const canvas = document.querySelector('#canvas');
    // const ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'black';
    // // ctx.fillRect(20, 20, 20, 20);
    // ctx.clearRect(10, 10, 10, 10);
})

function getTargetElement(element) {
    if (element === null) {
        return null
    }
    let classString = element.attributes['class'];
    if (classString !== undefined && classString !== null) {
        if (classString.value === 'theme-hope-content') {
            return null;
        }
    }
    let parentElement = getTargetElement(element.parentElement);
    if (parentElement !== null) {
        return parentElement;
    } else {
        return element;
    }
}

function focus(element) {
    if (element == null) {
        return;
    }
    element.style['z-index'] = '9999'
    element.style['box-shadow'] = '0 0 0 2000px rgba(2, 2, 2, 0.5)'
    // element.style['pointer-events'] = 'none'
    // last_rect = element.getBoundingClientRect();
    // if (last_rect !== null) {
    //     lastTop = last_rect.height + 10;
    //     document.documentElement.style.setProperty('--mask-height', last_rect.height + 'px');
    //     document.documentElement.style.setProperty('--mask-top', last_rect.top + 'px');
    //     document.documentElement.style.setProperty('--mask-left', last_rect.left + 'px');
    //     document.documentElement.style.setProperty('--mask-width', last_rect.width + 'px');
    //     console.log(last_element.getClientRect())
    //     let mask = document.querySelector('.font-color');
    //     mask.appendChild(last_element.cloneNode(true));
    // }
    // element.classList.add('font-color')
    // element.style.outline = '999999px solid rgba(146, 18, 18, 0.5)'
    // element.style['box-shadow'] = '0 0 10px 10px rgba(146, 18, 18, 0.5)'
    // element.style['-webkit-filter'] = 'blur(5px)'
    // element.style['-moz-filter'] = 'blur(5px)'
    // element.style['-ms-filter'] = 'blur(5px)'
    // element.style['filter'] = 'blur(5px)'
    // element.style.removeProperty('-webkit-filter')
    // element.style.removeProperty('-moz-filter')
    // element.style.removeProperty('-ms-filter')
    // element.style.removeProperty('filter')
}

function removeFocus(element) {
    element.style['box-shadow'] = ''
    element.style['z-index'] = ''
    element.style['pointer-events'] = ''
    // element.style.removeProperty('outline')
    // element.classList.remove('font-color')
    // element.style['z-index'] = ''
    // element.style['box-shadow'] = ''
    // element.style['-webkit-filter'] = ''
    // element.style['-moz-filter'] = ''
    // element.style['-ms-filter'] = ''
    // element.style['filter'] = ''
}

function get_current_element(event){
    var x = event.clientX, y = event.clientY,
    element = document.elementFromPoint(x, y);
    return getTargetElement(element);
}

function track_mouse(event){
    var elementMouseIsOver = get_current_element(event)
    if (elementMouseIsOver === null) {
        return
    }
    let tagName = elementMouseIsOver.tagName.toLowerCase();
    if (elementMouseIsOver === last_element || notShowSet.has(tagName)) {
        return
    }
    if (last_element != null) {
        removeFocus(last_element)
    }
    focus(elementMouseIsOver)
    last_element = elementMouseIsOver
}

function throttle(func, wait, mustRun) {
    var timeout,
        startTime = new Date();
 
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
 
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        }else{
            timeout = setTimeout(func, wait);
        }
    };
};


function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function changeShowLocation() {
    let curTop = last_element.getBoundingClientRect().top;
    for (let val = lastTop; val < curTop; val++) {
        document.documentElement.style.setProperty('--mask-top', val + 'px');
    }
    lastTop = curTop;
}

</script>

<style lang="scss">

@media screen and (min-width: 1680px) {
    :root {
    --mask-width: 0px;
    --mask-height: 0px;
    --mask-top: 0px;
    --mask-left: 0px;
}

.font-color {
    // color: var(--theme-font-color) !important;
    // position: fixed;
    // left: var(--mask-left);
    // top: var(--mask-top);
    // width: var(--mask-width);
    // height: var(--mask-height);
    // left: var(--mask-left);
    // top: var(--mask-top);
    // width: auto;
    // height: auto;
    background-color: transparent;
    box-shadow: 0 0 0 2000px rgba(2, 2, 2, 0.6);
    z-index: 999;
    pointer-events: none;
    // padding: 0;
    // margin: 0;
    // pointer-events: none;
    // filter: blur(2px);
    // border-radius: 5px;
}


// * {
//     color: var(--theme-font-color-dark) !important;
// }

// #canvas {
//     position: fixed;
//     left: 0;
//     top: 0;
//     width: 100vw;
//     height: 100vh;
//     z-index: 999;
//     background-color: bisque;
//     // opacity: 0.2;
//     pointer-events: none;
// }

#focus {
    position: fixed;
    opacity: 0.5;
    right: 30px;
    bottom: 90px;
    transform: translate(0, -100%);
    width: 50px;
    height: 50px;
    border: none;
    z-index: 170;
    border-radius: 30px;
    background-color: transparent;
    border: 2px solid var(--theme-color);
    font-weight: bold;
    color: var(--theme-grey-color);
    transition: all 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
}

#focus:hover {
    opacity: 1;
    cursor: pointer;
}
}

</style>