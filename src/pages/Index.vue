<template>
  <div class="index">
    <Loading v-show="isHistoryLoading" />
    <v3-virtual-scroll
      v-slot="{ item }"
      :list="list"
      :height="667"
      :itemHeight="104"
      :startOffset="2"
      :endOffset="2"
      key="id"
      @onTouchEnd="onTouchEnd"
      @onTouchTop="onTouchTop"
    >
      <router-link :to="{ name: 'Detail', params: { item: json(item) } }" class="scroll-item">
        <div class="scroll-item__left" :style="{ 'background-image': `url(${item.image})` }"></div>
        <div class="scroll-item__right">
          <div class="scroll-item__right--title">{{ item.title }}</div>
          <div class="scroll-item__right--desc">
            <p>{{ item.name }}发布于：{{ item.date }}</p>
            <p>{{ item.address }}</p>
          </div>
        </div>
      </router-link>
    </v3-virtual-scroll>
    <Loading v-show="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import v3VirtualScroll from '~/packages/v3-virtual-scroll/Index.vue'
import Loading from '@/components/loading/Index.vue'
import * as Api from '@/api'

// 真实数据
let list = reactive<Api.CarList[]>([])
// 加载数据
let isLoading = ref<boolean>(false)
// 历史加载数据
let isHistoryLoading = ref<boolean>(false)

async function onTouchTop(done: Function): Promise<void> {
  console.log('滚动到顶了..')
  await getCarHistoryList()
  await done()
}
async function onTouchEnd(done: Function): Promise<void> {
  console.log('滚动到底了..')
  await getCarList()
  await done()
}
async function getCarHistoryList(): Promise<void> {
  isHistoryLoading.value = true
  try {
    const res = await Api.getCarList(30)
    list.unshift(...res.list)
  } catch {
    console.log('加载失败！！')
  } finally {
    isHistoryLoading.value = false
  }
}
async function getCarList(): Promise<void> {
  isLoading.value = true
  try {
    const res = await Api.getCarList(30)
    list.push(...res.list)
  } catch {
    console.log('加载失败！！')
  } finally {
    isLoading.value = false
  }
}

function json(obj: Record<string, any>) {
  return JSON.stringify(obj)
}

function init() {
  getCarList()
}

onMounted(init)
</script>

<style lang="less" scoped>
.index {
  a {
    text-decoration: none;
  }
  .scroll-item {
    display: flex;
    margin-bottom: 4px;

    &__left {
      width: 100px;
      height: 100px;
      background-size: cover;
    }
    &__left img {
      width: 100%;
      height: 100%;
    }
    &__right {
      flex: 1;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      &--title {
        font-size: 18px;
        color: #000;
      }
      &--desc {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
      }
      &--desc p:last-child {
        color: orange;
      }
    }
  }
}
</style>
