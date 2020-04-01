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
  let currentTop: number // 当前top值，当前下拉的时候的top值

  // addEventListener 第三个参数的意义
  // true - 事件句柄在捕获阶段执行
  // false- 默认。事件句柄在冒泡阶段执行
  element.addEventListener(
    'touchstart',
    function(event: TouchEvent) {
      if ($timer) {
        //如果重新开始了touchstart,则要把上一次的回弹定时器清掉
        clearInterval($timer)
        // $timer = null
      }
      // 做节流
      let touchMove = throttle(_touchMove, 30)
      // 只有当此元素处于原始位置，才能下拉
      if (element.offsetTop === originalTop && element.scrollTop === 0) {
        // 优化：在下拉的过程中，也可以再次下拉
        // if (element.scrollTop === 0) {
        currentTop = element.offsetTop //记录一下开始的时候的top值
        startY = event.touches[0].pageY //记录当前点击的纵坐标
        element.addEventListener('touchmove', touchMove, true)
        element.addEventListener('touchend', touchEnd, true)
      }

      function _touchMove(event: TouchEvent) {
        let pageY = event.touches[0].pageY //拿到最新的纵坐标
        if (pageY > startY) {
          distance = pageY - startY
          // element.style.top = originalTop + distance + 'px'
          element.style.top = currentTop + distance + 'px'
        } else {
          element.removeEventListener('touchmove', touchMove)
          element.removeEventListener('touchend', touchEnd)
        }
      }

      function touchEnd(_event: TouchEvent) {
        element.removeEventListener('touchmove', touchMove)
        element.removeEventListener('touchend', touchEnd)
        $timer = setInterval(() => {
          let currentTop = element.offsetTop
          if (currentTop - originalTop > 1) {
            element.style.top = currentTop - 1 + 'px'
          } else {
            element.style.top = originalTop + 'px'
          }
          // if (distance < 1) {
          //   element.style.top = originalTop + 'px'
          //   clearInterval($timer)
          //   $timer = null
          // }
          // element.style.top = originalTop + --distance + 'px'
        }, 13)

        if (distance > 30) {
          // callback()
        }
      }
    },
    true
  )
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

// 节流
export function throttle(fn: Function, delay: number) {
  let prev = Date.now()
  return function() {
    let context = this
    let args = arguments
    let now = Date.now()
    if (now - prev >= delay) {
      fn.apply(context, args)
      prev = now
    }
  }
}
