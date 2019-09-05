import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './eleui'

new Vue({
  // render: h => h(App),
  el: '#app',
  components: { App },
  template: '<App />'
})
// .$mount('#app')
