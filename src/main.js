import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './eleui'
import router from './router'

new Vue({
  // render: h => h(App),
  el: '#app',
  components: { App },
  template: '<App />',
  router
})
// .$mount('#app')
