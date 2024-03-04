<template>
  <div class="help-manual">
    <h1 class="title">帮助手册</h1>
    <p>这是您的量化炒股系统的帮助手册。</p>
    <h2 class="subtitle">系统介绍</h2>
    <p>这款系统是基于Java Web开发的，采用先进的技术架构和工具，提供高效、稳定的股票交易服务。</p>
  </div>
</template>

<script>
export default {
  name: "StockHelp"
}
</script>

<style scoped>
.help-manual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
