<template>
  <div class="v3-vs-loading">
    <div class="vs-loading"></div>
  </div>
</template>

<style scoped>
.v3-vs-loading {
  width: 100%;
  text-align: center;
  padding: 6px 0;
}

.vs-loading {
  width: 20px;
  height: 20px;
  display: inline-block;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4662c7e0;
  border-radius: 50%;
  animation: loading 0.8s infinite linear;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
