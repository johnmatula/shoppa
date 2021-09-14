import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      {
        id: 0,
        title: "1992 McDonald’s Vintage Barbie Figure Roller Skating",
        image: "https://di2ponv0v5otw.cloudfront.net/posts/2019/08/25/5d62e09f9d3b7830e21d567a/m_5d62e0ab2f4831b4c998a9cb.jpg",
        price: 33,
        isBestSeller: true,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 1,
        title: "Rake",
        image: "https://www.gardeningknowhow.com/wp-content/uploads/2017/04/leaf-rake.jpg",
        price: 21.99,
        isBestSeller: false,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 2,
        title: "Sashay Away Enamel Pin",
        image: "https://ae01.alicdn.com/kf/HTB19e6bev1H3KVjSZFHq6zKppXaa/Purple-Engraved-SASHAY-AWAY-Enamel-Pins-Drag-Race-Drag-Queen-Katya-All-Stars-Lapel-Pin-Brooches.jpg_Q90.jpg_.webp",
        price: 3.58,
        isBestSeller: false,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 3,
        title: "Contact (1997), Blu-ray Disc",
        image: "https://www.denofgeek.com/wp-content/uploads/2013/06/contact_lead.jpg",
        price: 18,
        isBestSeller: false,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 4,
        title: "Orange Tic-Tacs, 12 Boxes",
        image: "https://64.media.tumblr.com/07bb0d6c52f6ccfe3c6280a8c8fe88fd/4a86aaf472662f58-3d/s500x750/76d373795c47f0da2e0aa4faca44a090f62da5ee.jpg",
        price: 18,
        isBestSeller: true,
        availableQuantity: 1,
        cartQuantity: 0
      },
      {
        id: 5,
        title: "Gold Glitter, 10 lbs.",
        image: "https://techcrunch.com/wp-content/uploads/2015/01/goldglitter.jpg",
        price: 105.68,
        isBestSeller: false,
        availableQuantity: 1,
        cartQuantity: 0
      }
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
