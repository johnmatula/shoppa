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
        price: 54.52,
        isBestSeller: true,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 1,
        title: "iPhone 13?",
        image: "https://picsum.photos/200/200",
        price: 999,
        isBestSeller: false,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 2,
        title: "RuPaul Sashay Shante Enamel Pin",
        image: "https://hottopic.scene7.com/is/image/HotTopic/11419583_hi?$productMainDesktopRetina$",
        price: 5.52,
        isBestSeller: false,
        availableQuantity: 1,
        cartQuantity: 0
      },
    ]
  },
  mutations: {
    adjustQuantities(state, payload) {
      state.products[payload.id].availableQuantity += payload.availableAmount
      state.products[payload.id].cartQuantity += payload.cartAmount
    },
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
    addToCart({ commit }, payload) {
      commit('adjustQuantities', {
        id: payload.id,
        availableAmount: payload.amount * -1,
        cartAmount: payload.amount
      })
    },
    removeFromCart({ commit }, payload) {
      commit('adjustQuantities', {
        id: payload.id,
        availableAmount: payload.amount,
        cartAmount: payload.amount * -1
      })
    }
  }
})
