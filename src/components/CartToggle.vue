<template>
    <button class="carttoggle" :class="{ 'carttoggle--animating' : animating }" @click="toggleCart" @animationend="animating = false">
      <span class="a11y--vo">Items in cart: </span>
      <span class="carttoggle__label">{{ totalCartQuantity }}</span>
    </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'totalCartQuantity'
    ]),
  },
  data: function() {
    return {
      animating: false
    }
  },
  watch: {
    totalCartQuantity: function() {
      this.animating = true
    }
  },
  methods: {
    toggleCart: function() {
      this.$emit('cart-toggled')
    }
  },
  name: 'CartToggle'
}
</script>

<style lang="scss">
.carttoggle {
  @include at-least(medium) {
    display: none;
  }

  &--animating {
    animation: pulse $timing-emphasis;
  }
}

.carttoggle__label {
  &::before {
    content: '🛒';
    font-size: 80%;
    margin-right: var(--size-a);
  }
}


@keyframes pulse {
  0% {
    transform: scale(1);
  }

  20% {
    transform: scale(1.2);
  }

  40% {
    transform: scale(.925);
  }

  60% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(.975);
  }

  100% {
    transform: scale(1);
  }
}
</style>
