# 长列表虚拟滚动按需展示优化

基于 Vue 3 + TypeScript + Vite

## 安装使用

```
npm install v3VirtualScroll -S
```

## 使用示例

```html
<template>
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
</template>
```

```javascript
<script setup>
import v3VirtualScroll from 'v3-virtual-scrolle'
import { ref, reactive } from 'vue'

let list = reactive([])

async function onTouchTop(done: Function): Promise<void> {
  console.log('滚动到顶了..')
  // 业务加载数据方法
  // await doLoadList()..
  // 加载完成执行done方法让v3-virtual-scroll组件打开加载更多开关
  await done()
}
async function onTouchEnd(done: Function): Promise<void> {
  console.log('滚动到底了..')
  // 业务加载数据方法
  // await doLoadList()..
  // 加载完成执行done方法让v3-virtual-scroll组件打开加载更多开关
  await done()
}
</script>
```

## 仓库模板【可以查看：实际长列表例子】

```
1. git clone https://github.com/duqingyu/v3-virtual-scroll
2. npm install
3. npm run dev
```

## 参数示例

| 参数        | 类型   | 必选 | 默认                 | 描述     |
| ----------- | ------ | ---- | -------------------- | -------- |
| list        | Array  | 是   | []                   | 数据源   |
| key        | String  | 是   | id                   |  唯一标识   |
| height      | Number | 否   | window.screen.height | 容器高度 |
| itemHeight  | Number | 是   |                      | 每项高度 |
| startOffset | Number | 否   | 一屏可放置的最大项数 | 开始占位 |
| endOffset   | Number | 否   | 一屏可放置的最大项数 | 结束占位 |
