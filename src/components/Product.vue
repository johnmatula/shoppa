<template>
  <li class="product">
    <img class="product__photo" :src="image" alt="">
    <div class="product__bestseller" v-if="isBestSeller">Best Seller</div>
    <div class="product__title">{{ title }}</div>
    <div class="product__actions">
      <div class="product__price">
        {{ formattedPrice }}
      </div>
      <button class="product__add" @click="buttonClicked">{{ buttonLabel }}</button>
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
  display: grid;
  gap: var(--size-b);
  grid-template:
    "photo bestseller"
    "photo title"
    "actions actions" / 8rem auto;
  padding: var(--size-a);

  @include at-least(medium) {
    grid-template:
      "photo"
      "bestseller"
      "title"
      "actions" / auto;
    padding: var(--size-a);
  }

  @include at-least(large) {
    grid-template:
      "photo bestseller"
      "photo title"
      "photo actions" / 8rem auto;
    padding: var(--size-a);
  }

  &__photo {
    border-radius: $radius-photo;
    grid-area: photo;
    height: 100%;
    width: 100%;
    max-height: 8rem;
    object-fit: cover;
    max-width: 8rem;

    @include at-least(medium) {
      max-height: 15rem;
      max-width: 15rem;
    }

    @include at-least(large) {
      max-height: 10rem;
      max-width: 10rem;
    }
  }

  &__bestseller {
    border-radius: 999px;
    color: $hue-purple-50;
    font-size: var(--font);
    font-variation-settings: 'HEXP' 25;
    font-weight: 650;
    grid-area: bestseller;
    letter-spacing: -.5px;
  }

  &__title {

  }

  &__actions {
    align-items: center;
    display: flex;
    grid-area: actions;
    justify-content: flex-end;
  }

  &__price {
    color: $hue-slate-50;
    font-size: 1.25rem;
    margin-right: var(--size-a);
  }

  &__add {
    flex: 0 0 auto;
  }
}
</style>
