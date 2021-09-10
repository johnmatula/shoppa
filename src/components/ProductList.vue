<template>
  <ul class="productlist">
    <li v-for="product in availableProductsAscending" v-bind:key="product.id">
      <Product v-bind="product" />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import Product from './Product.vue'

export default {
  name: 'ProductList',
  props: {
  },
  computed: {
    ...mapGetters([
      'availableProducts',
    ]),
    availableProductsAscending: function() {
      return this.sortProducts([...this.availableProducts], 'ASC')
    },
    availableProductsDescending: function() {
      return this.sortProducts([...this.availableProducts], 'DESC')
    }
  },
  methods: {
    // Compare by price, then by best seller first, then by title.
    sortProducts: function(array, direction) {
      array.sort((a, b) => {
        if (a.price == b.price) {
          if (a.isBestSeller && b.isBestSeller) {
            if (a.title < b.title) { return -1 }
            else if (a.title > b.title) { return 1 }
            else { return 0 }
          } else if (a.isBestSeller) { return -1 }
          else if (b.isBestSeller) { return 1 }
          else { return 0 }
        } else if (direction == 'ASC') {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })

      return array
    }
  },
  components: {
    Product
  }
}
</script>

<style lang="scss">

</style>
