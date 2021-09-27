import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
axios.defaults.baseURL = "/api";
//axios.defaults.baseURL = "http://localhost:8000/api";

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
