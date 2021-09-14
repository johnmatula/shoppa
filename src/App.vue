<template>
  <div id="app">
    <div class="app__title">
      <h1 class="app__header">shoppa</h1>
      <div class="app__carttoggle">
        <CartToggle @cart-toggled="toggleCartVisibility" />
      </div>
    </div>
    <div class="app__container">
      <div class="app__productlist">
        <ProductList />
      </div>
      <div class="app__cart" :class="{ 'app__cart--opened' : cartVisible}">
        <Cart @close-clicked="toggleCartVisibility" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import CartToggle from './components/CartToggle.vue'

export default {
  name: 'App',
  data: function() {
    return {
      cartVisible: false
    }
  },
  methods: {
    toggleCartVisibility: function() {
      this.cartVisible = !this.cartVisible
    }
  },
  components: {
    ProductList,
    Cart,
    CartToggle
  }
}
</script>

<style lang="scss">
@import '@/styles/app.scss';

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: stretch;
  max-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  overflow: auto;
}

.app {
  &__title {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    padding: var(--size-c);
  }

  &__carttoggle {
    flex: 0 0 auto;

    @include at-least(medium) {
      display: none;
    }
  }

  &__header {
    flex: 1 1 100%;
    font-size: 2rem;
    font-weight: 900;
    font-variation-settings: 'HEXP' 100;
    letter-spacing: -6px;
    margin: 0;
    padding: 0;
    text-align: left;
    text-transform: uppercase;

    @include at-least(medium) {
      text-align: center;
    }
  }

  &__container {
    align-items: stretch;
    display: flex;
    flex: 1 1 100%;
    justify-content: stretch;
    overflow: auto;
  }

  &__productlist,
  &__cart {
    overflow: auto;
  }

  &__productlist {
    flex: 1 1 100%;

    @include at-least(medium) {
      box-shadow: -1px 0 0 0 $hue-translucent-10 inset;
      flex: 1 1 60%;
    }
  }

  &__cart {
    transform: translateY(-100vh);
    background: $hue-neutral-20;
    bottom: 0;
    flex: 1 1 100%;
    left: 0;
    overflow: auto;
    position: absolute;
    right: 0;
    top: 0;
    visibility: hidden;
    z-index: $z-cart;

    transition: left 0s $timing-modal-exit, top 0s $timing-modal-exit, visibility 0s $timing-modal-exit, transform $timing-modal-exit;


    &--opened {
      transform: translateY(0vh);
      visibility: visible;

      transition: transform $timing-modal-entrance;
    }

    @include at-least(medium) {
      flex: 1 1 40%;
      position: relative;
      transform: none;
      visibility: visible;
    }
  }
}

.anim--cart {
  &-enter {
    background: purple;
    max-height: 0;
    opacity: 0;
    outline: 5px solid red;
    visibility: hidden;
  }

  &-enter-to {
    background: red;
    max-height: 999px;
    opacity: 1;
    visibility: visible;
  }

  &-leave {
    height: auto;
    opacity: 1;
  }

  &-leave-to {
    background: blue;
    opacity: 0;
    transition: background $timing-exit, opacity $timing-exit;
  }
}
</style>
