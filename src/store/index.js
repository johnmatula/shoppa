import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      {
        id: 0,
        title: "Cranberry Nut Trail Mix (20 oz.)",
        image: "https://picsum.photos/200/200",
        price: "54.52",
        isBestSeller: true,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 1,
        title: "iPhone 13?",
        image: "https://picsum.photos/200/200",
        price: "999",
        isBestSeller: false,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 2,
        title: "RuPaul Sashay Shante Enamel Pin",
        image: "https://hottopic.scene7.com/is/image/HotTopic/11419583_hi?$productMainDesktopRetina$",
        price: "5.52",
        isBestSeller: false,
        availableQuantity: 1,
        cartQuantity: 0
      },
    ]
  },
  mutations: {
    addToCart(state, product, amount = 1) {
      state.products[product].availableQuantity -= amount
      state.products[product].cartQuantity += amount
    },
    removeFromCart(state, product, amount = 1) {
      state.products[product].cartQuantity -= amount
      state.products[product].availableQuantity += amount
    }
  },
  getters: {
    availableProducts: (state) => {
      return state.products.filter(product => product.availableQuantity > 0)
    },
    cartProducts: state => {
      return state.products.filter(product => product.cartQuantity > 0)
    }
  },
  actions: {
  },
  modules: {
  },
})
