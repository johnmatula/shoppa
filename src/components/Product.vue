<template>
  <li class="product">
    <img :src="image" alt="">
    <div class="product__bestseller" v-if="isBestSeller">Best Seller</div>
    <div class="product__title">{{ title }}</div>
    <div class="product__price">
      {{ formattedPrice }}
    </div>
    <button label="Hi world" @click="buttonClicked">add/remove carte</button>
  </li>
</template>

<script>
export default {
  name: 'Product',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    availableQuantity: {
      type: Number
    },
    isBestSeller: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    buttonClicked: function() {
      this.$emit('productButtonClicked')
    }
  },
  computed: {
    formattedPrice: function() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.price)
    }
  }
}
</script>

<style lang="scss">
li {
  outline: 1px solid red;
}
img {
  max-width: 300px;
}
</style>
