import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
// import echarts from "echarts"
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;
Vue.use(QuillEditor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
