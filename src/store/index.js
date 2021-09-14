import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      {
        id: 0,
        title: "Cranberry Nut Trail Mix (20 oz.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante justo, dapibus sed felis at, mollis ultrices eros. Phasellus fermentum bibendum sapien ac laoreet.",
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
    ADJUST_QUANTITIES(state, payload) {
      state.products[payload.id].availableQuantity += payload.availableAmount
      state.products[payload.id].cartQuantity += payload.cartAmount
    },
  },
  getters: {
    availableProducts: state => {
      return state.products.filter(product => product.availableQuantity > 0)
    },
    cartProducts: state => {
      return state.products.filter(product => product.cartQuantity > 0)
    },
    totalCartQuantity: (state, getters) => {
      var runningQuantity = 0
      getters.cartProducts.forEach(product => {
        runningQuantity += product.cartQuantity
      })
      return runningQuantity
    },
    totalAvailableQuantity: (state, getters) => {
      var runningQuantity = 0
      getters.availableProducts.forEach(product => {
        runningQuantity += product.availableQuantity
      })
      return runningQuantity
    },
    totalCartPrice: (state, getters) => {
      var runningPrice = 0
      getters.cartProducts.forEach(product => {
        runningPrice += product.price * product.cartQuantity
      })
      return runningPrice
    }
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('ADJUST_QUANTITIES', {
        id: payload.id,
        availableAmount: payload.amount * -1,
        cartAmount: payload.amount
      })
    },
    removeFromCart({ commit }, payload) {
      commit('ADJUST_QUANTITIES', {
        id: payload.id,
        availableAmount: payload.amount,
        cartAmount: payload.amount * -1
      })
    }
  }
})
