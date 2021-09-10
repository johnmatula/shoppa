<template>
  <div class="cart">
    <ul class="cart__list">
    <Product
      v-for="product in cartProducts"
      v-bind="product"
      v-bind:key="product.id"
      @productButtonClicked="removeProductFromCart(product)" />
    </ul>
    <div class="cart__total">{{ totalPrice }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Product from './Product.vue'

export default {
  name: 'Cart',
  props: {
  },
  computed: {
    ...mapGetters([
      'cartProducts',
    ]),
    totalPrice: function() {
      var total = 0
      this.cartProducts.forEach(product => {
        total += product.price * product.cartQuantity
      })
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)
    }
  },
  methods: {
    removeProductFromCart(product) {
      this.$store.dispatch('removeFromCart', {id: product.id, amount: product.cartQuantity});
    }
  },
  components: {
    Product
  }
}
</script>

<style scoped lang="scss">
ul {
  background: blue;
}
</style>
