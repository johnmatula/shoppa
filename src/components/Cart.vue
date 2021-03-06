<template>
  <div class="cart">
    <div class="cart__controls">
      <button class="cart__close" @click="closeCart">Close</button>
    </div>
    <h2 class="cart__heading">Shopping cart: {{ totalCartQuantity }} {{ totalCartQuantity === 1 ? "item" : "items" }}</h2>
    <ul class="cart__list" v-if="totalCartQuantity">
      <Product
        v-for="product in cartProducts"
        v-bind="product"
        v-bind:key="product.id"
        buttonLabel="🗑"
        @productButtonClicked="removeProductFromCart(product)" />
    </ul>
    <div class="cart__empty" v-if="!totalCartQuantity">
      <p>Make your cart happy by adding some products.</p>
    </div>
    <div class="cart__total">
      <p class="cart__total-header">Total cost</p>
      <transition name="anim--cart-price">
        <div class="cart__total-price" :key="totalPrice">{{ totalPrice }}</div>
      </transition>
    </div>
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
      'totalCartPrice',
      'totalCartQuantity'
    ]),
    totalPrice: function() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.totalCartPrice)
    },
    totalQuantity: function() {
      return this.totalCartQuantity
    }
  },
  methods: {
    removeProductFromCart(product) {
      this.$store.dispatch('removeFromCart', {id: product.id, amount: product.cartQuantity});
    },
    closeCart() {
      this.$emit('close-clicked')
    }
  },
  components: {
    Product
  }
}
</script>

<style lang="scss">
.cart {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: stretch;
  position: relative;

  > * {
    padding: var(--size-c);
  }

  &__empty {
    @extend %typography-empty;

    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    text-align: center;
  }

  &__heading {
    @extend %typography-heading;

    color: $hue-slate-50;
    margin: 0;
    padding: var(--size-c) var(--size-c) 0;
  }

  &__controls {

    @include at-least(medium) {
      display: none;
    }
  }

  &__list {
    flex: 1 1 100%;
    list-style: none;
    margin: 0;
    overflow: auto;

  }

  &__total {
    flex: 0 0 auto;
    text-align: right;
  }

  &__total-header {
    @extend %typography-subheading;

    color: $hue-slate-50;
  }

  &__total-price {
    @extend %typography-cart-total-price;
  }


  .product + .product {
    margin-top: var(--size-c);
  }
}

.anim--cart-price {
  &-enter {
    max-height: 0;
    opacity: 0;
    transform: translateY(1rem);
    visibility: hidden;
  }

  &-enter-to {
    max-height: 999px;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: transform $timing-entrance $timing-exit, visibility 0s $timing-exit, opacity $timing-entrance $timing-exit, max-height 0s $timing-exit;
  }

  &-leave {
    height: auto;
    opacity: 1;
  }

  &-leave-to {
    opacity: 0;
    transition: opacity $timing-exit;
  }
}

</style>
