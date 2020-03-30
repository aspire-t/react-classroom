//实现加载更多的功能。就是快拉到底部的时候，就自动加载下一页
export function loadMore(element: HTMLDivElement, callback: Function) {
  function _loadMore() {
    console.log('load more')
    let containerHeight = element.clientHeight // 容器的高度
    let scrollTop = element.scrollTop // 向上卷去的高度
    let scrollHeight = element.scrollHeight // 内容的高度
    // 重点就是计算高度
    if (containerHeight + scrollTop + 20 >= scrollHeight) {
      callback()
    }
  }
  element.addEventListener('scroll', debounce(_loadMore, 300))
}
// 下拉刷新
export function downRefresh(element: HTMLDivElement, callback: Function) {
  let startY: number //变量，存储接下时候的纵坐标
  let distance: number //本次下拉的距离
  let originalTop = element.offsetTop //最初此元素距离顶部的距离 top=50px
  let $timer: any
  let currentTop: number
}

// 防抖
export function debounce(fn: Function, wait: number) {
  let timeout: number = null
  return function() {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait)
  }
}
