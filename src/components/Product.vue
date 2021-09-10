<template>
  <div class="product">
    <img :src="image" alt="">
    <div class="product__bestseller" v-if="isBestSeller">Best Seller</div>
    <div class="product__title">{{ title }}</div>
    <div class="product__price">
      {{ formattedPrice }}
    </div>
  </div>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
