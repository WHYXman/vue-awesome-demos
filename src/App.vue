<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.el-dialog .el-dialog__body{
  max-height: 60vh;
  overflow: auto;
}
</style>
