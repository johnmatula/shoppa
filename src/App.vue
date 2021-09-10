<template>
  <div id="app">
    <h1>shoppa</h1>
    <ProductList />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'

export default {
  name: 'App',
  components: {
    ProductList
  }
}
</script>

<style lang="scss">

</style>
