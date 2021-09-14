<template>
  <li class="product">
    <img class="product__photo" :src="image" alt="">
    <div class="product__content">
      <div class="product__bestseller" v-if="isBestSeller">Best Seller</div>
      <p class="product__title">{{ title }}</p>
      <div class="product__actions">
        <p class="product__price">
          {{ formattedPrice }}
        </p>
        <button class="product__add" @click="buttonClicked">{{ buttonLabel }}</button>
      </div>
    </div>
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
    },
    buttonLabel: {
      type: String,
      default: 'Add/Remove'
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
.product {
  background-color: $hue-neutral-10;
  border-radius: $radius-card;
  display: flex;
  padding: var(--size-c);

  @include at-least(medium) {
    flex-direction: column;
    padding: 0;
  }

  @include at-least(large) {
    flex-direction: row;
  }

  &__photo {
    border-radius: 0;
    flex: 0 0 auto;
    height: 4rem;
    object-fit: cover;
    width: 4rem;

    @include at-least(medium) {
      border-radius: $radius-card $radius-card 0 0;
      height: 8rem;
      width: 100%;
    }

    @include at-least(large) {
      align-self: stretch;
      border-radius: $radius-card 0 0 $radius-card;
      height: auto;
      width: 8rem;
    }
  }

  &__content {
    display: flex;
    flex: 1 1 100%;
    flex-direction: column;
    gap: var(--size-b);
    padding-left: var(--size-c);

    @include at-least(medium) {
      padding: var(--size-b);
    }
  }

  &__bestseller {
    @extend %typography-subheading;

    align-items: center;
    align-self: flex-start;
    background-color: $hue-slate-50;
    border-radius: 999px;
    color: $hue-neutral-20;
    display: flex;
    grid-area: bestseller;
    padding: var(--size-a);
  }

  &__title {
    flex: 1 1 auto;
    margin: 0;
  }

  &__actions {
    align-items: center;
    display: flex;
    justify-content: flex-end;
  }

  &__price {
    color: $hue-slate-50;
    font-size: 1.25rem;
    margin: 0 var(--size-b) 0 0;
  }

  &__add {
    flex: 0 0 auto;
  }
}
</style>
