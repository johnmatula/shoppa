<template>
  <div class="productlist">
    <div class="productlist__filters">
      <label>
        <input type="radio" name="sort" :value="sortDirection" :disabled="totalAvailableQuantity <= 1" @change="updateSortDirection('ASC')" checked> Price low to high</label>
      <label>
        <input type="radio" name="sort" :value="sortDirection" :disabled="totalAvailableQuantity <= 1" @change="updateSortDirection('DESC')"> Price high to low</label>
    </div>
    <ul class="productlist__list" v-if="totalAvailableQuantity">
      <Product
        v-for="product in sortedProducts"
        v-bind="product"
        v-bind:key="product.id"
        buttonLabel="➕ Add"
        @productButtonClicked="addProductToCart(product)" />
    </ul>
    <div class="productlist__empty" v-if="!totalAvailableQuantity">
      <p>You’ve added everything we’ve got to your cart. Nice work!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Product from './Product.vue'

export default {
  name: 'ProductList',
  data: function() {
    return {
      sortDirection: 'ASC'
    }
  },
  computed: {
    ...mapGetters([
      'availableProducts',
      'totalAvailableQuantity'
    ]),
    ...mapActions([
      'addToCart'
    ]),
    sortedProducts: function() {
      return this.sortProducts([...this.availableProducts], this.sortDirection)
    },
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
.productlist {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--size-b);

  &__empty {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    text-align: center;
  }

  &__filters {
    color: $hue-slate-50;
    padding-bottom: var(--size-b);

    > * {
      display: inline;

      @include at-least(medium) {
        display: block;
      }

      @include at-least(large) {
        display: inline;
      }
    }

    > * + * {
      margin-left: var(--size-b);

      @include at-least(medium) {
        margin-left: 0;
        margin-top: var(--size-a);
      }

      @include at-least(large) {
        margin-left: var(--size-b);
        margin-top: 0;
      }
    }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;

    > * + *{
      margin-top: var(--size-b);
    }
  }
}
</style>
