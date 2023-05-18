// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app) {
        // 懒加载指令逻辑

        // 定义全局指令
        // 这个属于图片懒加载部分
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el: 指令绑定的那个元素 img
                // binding: binding.value 指令等于号后面绑定的表达式的值 图片url
                console.log(el, binding.value)
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        console.log(isIntersecting)
                        // 第一次赋值之后，就不用再监听了 -> stop()
                        // 防止内存的浪费
                        if (isIntersecting) {
                            // 进入视图区域
                            el.src = binding.value
                            stop()
                        }
                    },
                )
            }
        })
    }
}