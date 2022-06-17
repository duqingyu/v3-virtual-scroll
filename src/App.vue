<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
