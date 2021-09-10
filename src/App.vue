<template>
  <div id="app">
    <h1>shoppa</h1>
    <ProductList />
    <Cart />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'

export default {
  name: 'App',
  components: {
    ProductList,
    Cart
  }
}
</script>

<style lang="scss">

</style>
