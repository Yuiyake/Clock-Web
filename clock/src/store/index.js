import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import app from './modules/app'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings
  },
  getters
})

export default store
