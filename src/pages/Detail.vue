<template>
  <div class="detail">
    <h2>{{ detailInfo.title }}</h2>
    <img class="cover" :src="detailInfo.image" />
    <p>发布人：{{ detailInfo.name }}</p>
    <p>发布日期：{{ detailInfo.date }}</p>
    <p>发布地址：{{ detailInfo.address }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const detailInfo = JSON.parse(route.params.item as string)
</script>

<style lang="less" scoped>
.detail {
  text-align: center;
  height: 200vh;
  background-color: #dbe7d25e;
  .cover {
    width: 100%;
    height: auto;
  }
}
</style>
