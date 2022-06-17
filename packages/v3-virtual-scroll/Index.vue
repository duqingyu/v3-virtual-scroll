<script setup lang="ts">
import { ref, computed, onUnmounted, onActivated, nextTick, withDefaults } from 'vue'
import * as Utils from '@/utils/util'
import Loader from '@/utils/loader'

const props = withDefaults(
  defineProps<{
    list: any[]
    key: string // 唯一标识
    height: number // 容器总高
    itemHeight: number // 每项高度
    startOffset?: number // 开始占位,默认一屏
    endOffset?: number // 结束占位,默认一屏
  }>(),
  {
    list: () => [],
    key: 'id',
    height: window.screen.height,
    itemHeight: 0,
    startOffset: 0,
    endOffset: 0
  }
)
const emits = defineEmits(['onTouchEnd', 'onTouchTop'])

// 滚动高度
let scrollTop = ref<number>(0)
let scrollContainer = ref<HTMLElement | null>(null)

// 可视区能容纳多少项
const count = computed(() => ~~(props.height / props.itemHeight) + 2)
// 最大索引
const lastIndex = computed(() => props.list.length - 1)
// 开始索引
const _startIndex = computed(() => ~~(scrollTop.value / props.itemHeight))
// 结束索引
const _endIndex = computed(() => Math.min(_startIndex.value + count.value, lastIndex.value))
// 开始占位
const startOffset = computed(() => props.startOffset || count.value)
// 结束占位
const endOffset = computed(() => props.endOffset || count.value)
// 实际开始
const startIndex = computed(() => {
  let start = _startIndex.value - startOffset.value
  return start < 0 ? 0 : start
})
// 实际结束
const endIndex = computed(() => {
  let end = _endIndex.value + endOffset.value
  return end > lastIndex.value ? lastIndex.value : end
})
// 实际渲染
const renderList = computed(() => props.list.slice(startIndex.value, endIndex.value))

const containerStyle = computed(() => ({ height: props.height + 'px' }))
const wrapperStyle = computed(() => {
  return {
    paddingTop: startIndex.value * props.itemHeight + 'px',
    paddingBottom: (lastIndex.value - endIndex.value) * props.itemHeight + 'px'
  }
})

// 加载处理
const topLoader = new Loader()
const bottomLoader = new Loader()

// 记录当前列表长度，用户更新滚动高度
let curListLength: number = 0
topLoader.onLoad(() => {
  curListLength = props.list.length
})
topLoader.onDone(() => {
  const { itemHeight, list } = props
  const scrollHeigt = (list.length - curListLength) * itemHeight
  setScroll(scrollHeigt)
})

// 滚动处理
const onScoll = Utils.debound((e: UIEvent): void => {
  scrollTop.value = (e.target as HTMLElement).scrollTop
  handleScroll()
}, 30)
function setScroll(value: number): void {
  const container = scrollContainer.value as HTMLElement
  container.scrollTop = value
}
function handleScroll(): void {
  // 滚动到顶
  if (scrollTop.value === 0 && !topLoader.isLoading) {
    topLoader.load()
    emits('onTouchTop', topLoader.done)
    return
  }
  // 滚动到底
  if (endIndex.value >= lastIndex.value && !bottomLoader.isLoading) {
    bottomLoader.load()
    emits('onTouchEnd', bottomLoader.done)
  }
}

onUnmounted(() => {
  document.removeEventListener('scroll', onScoll)
})
onActivated(() => {
  nextTick(() => {
    setScroll(scrollTop.value)
  })
})
</script>

<template>
  <div class="virtual-container" @scroll="onScoll" :style="containerStyle" ref="scrollContainer">
    <div class="virtual-container__wrapper" :style="wrapperStyle">
      <div v-for="item in renderList" :key="item[key]">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
  <!-- <div id="virtual-container__debug">
    <p>startIndex： {{ startIndex }}</p>
    <p>endIndex： {{ endIndex }}</p>
    <p>scrollTop {{ scrollTop }}</p>
    <p>count {{ count }}</p>
    <p>paddingTop {{ wrapperStyle.paddingTop }}</p>
    <p>renderList.length {{ renderList.length }}</p>
    <p>list.length {{ list.length }}</p>
  </div> -->
</template>

<style scoped lang="less">
.virtual-container {
  height: 100vh;
  width: 100%;
  overflow-y: auto;

  &__wrapper {
    height: 100%;
  }
  // &__debug {
  //   padding: 10px;
  //   color: #fff;
  //   border-radius: 4px;
  //   background: rgba(0, 0, 0, 0.6);
  //   position: fixed;
  //   top: 30px;
  //   left: 10px;
  // }
}
</style>
