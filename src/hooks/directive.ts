import { useClipboard } from "@vueuse/core"
import type { App } from "vue"
import { ElMessage } from "element-plus";

export const vLoading = ((_this: App<Element>) => {
    _this.directive('loading', (el: HTMLElement, binding: any) => {
        el.innerHTML = `
            <div class="loading">
            <div class="box">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        `
    })
})
export const vLoading2 = ((_this: App<Element>) => {
    _this.directive('loading2', (el: HTMLElement, binding: any) => {
        let { show, style, wait } = binding.value;
        show = show ?? true
        style = style ?? 1
        wait = wait ?? 0
        style = `loading-${style}`
        var state = show ? 'flex' : 'none'
        el.style.position = 'relative'
        let dom = '';

        switch (style) {
            case 'loading-1':
                dom = `
                <div id="loading-1" class="loading-1" style="display:${state}">
                <div class="box">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            `
                break;
            case 'loading-2':
                dom = `
                <div id="loading-2" class="loading-2" style="display:${state}">
                <div class="balls">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            `
                break;
        }
        //延时加载
        if (wait) {
            let frag = document.createRange().createContextualFragment(dom);
            el.appendChild(frag)
            const childrenEl = document.getElementsByClassName(style)
            setTimeout(() => {
                let flag = true;
                for (let i = 0; i < childrenEl.length; i++) {
                    if (flag) {
                        if (childrenEl[i] instanceof HTMLElement) {
                            el.removeChild(childrenEl[i])
                            flag = false;
                        }
                    }
                }
            }, wait)
        } else {
            const childrenEl = document.getElementById(style) as HTMLElement;
            if (show) {
                //将字符串转为dom元素
                if (!childrenEl) {
                    let frag = document.createRange().createContextualFragment(dom);
                    el.appendChild(frag)
                }
            } else {
                if (childrenEl) {
                    el.removeChild(childrenEl)
                }
            }
        }
    })
})
export const vCopy = ((_this: App<Element>) => {
    _this.directive('copy', (el: HTMLElement, binding: any) => {
        const { isSupported, copy } = useClipboard()
        el.onclick = (() => {
            if (binding.value) {
                copy(binding.value)
                ElMessage({
                    type: 'success',
                    message: "复制成功"
                })
            }
        })
    })
})
export const vFullscreen = ((_this: App<Element>) => {
    _this.directive('fullscreen', (el: HTMLElement, binding: any) => {
        let isFullscreen = binding.value;
        const element = document.documentElement as any;
        let doc = document as any;
        // 判断全屏状态的变量
        el.onclick = (() => {
            // 如果是全屏状态
            if (isFullscreen) {
                // 如果浏览器有这个Function
                if (doc.exitFullscreen) {
                    doc.exitFullscreen()
                } else if (doc.webkitCancelFullScreen) {
                    doc.webkitCancelFullScreen()
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen()
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen()
                }
            } else {
                // 如果浏览器有这个Function
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen()
                }
            }
        })
    })
})
export const vJelly = ((_this: App<Element>) => {
    _this.directive('jelly', (el: HTMLElement, binding: any) => {
        el.classList.add('jelly');
    })
})



























export const vTest = {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el: any, binding: any, vnode: any, prevVnode: any) {
        // 下面会介绍各个参数的细节
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el: any, binding: any, vnode: any, prevVnode: any) {

    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el: { innerHTML: string }, binding: any, vnode: any, prevVnode: any) {
        console.log(el, 'el');

        el.innerHTML = `
        <div class="loading-2">
        <div class="balls">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div> `
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el: any, binding: any, vnode: any, prevVnode: any) { },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el: any, binding: any, vnode: any, prevVnode: any) { },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el: any, binding: any, vnode: any, prevVnode: any) { },
    // 绑定元素的父组件卸载后调用
    unmounted(el: any, binding: any, vnode: any, prevVnode: any) { }
}
