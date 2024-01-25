<template>
  <img  :src="logoUrl" />
</template>

<script>
export default {
  name: "StockPicker",

  data() {
    return {
      logoUrl: require('@/assets/images/common/stockpicker_Preview.png')
    }
  },
}
</script>

<style scoped>

</style>
