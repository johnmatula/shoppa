<template>
  <div class="productlist">
    <div class="productlist__filters">
      <label><input type="radio" name="sort" :value="sortDirection" @change="updateSortDirection('ASC')" checked> Price low to high</label>
      <label><input type="radio" name="sort" :value="sortDirection" @change="updateSortDirection('DESC')"> Price high to low</label>
    </div>
    <ul class="productlist__list">
      <Product
        v-for="product in sortedProducts"
        v-bind="product"
        v-bind:key="product.id"
        @productButtonClicked="addProductToCart(product)" />
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Product from './Product.vue'

export default {
  name: 'ProductList',
  props: {
    sortDirection: {
      type: String,
      default: 'ASC'
    },
  },
  computed: {
    ...mapGetters([
      'availableProducts'
    ]),
    ...mapActions([
      'addToCart'
    ]),
    sortedProducts: function() {
      return this.sortProducts([...this.availableProducts], this.sortDirection)
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
    },
    addProductToCart(product) {
      this.$store.dispatch('addToCart', {id: product.id, amount: product.availableQuantity});
    },
    updateSortDirection(direction) {
      this.sortDirection = direction
    }
  },
  components: {
    Product
  }
}
</script>

<style lang="scss">

</style>
