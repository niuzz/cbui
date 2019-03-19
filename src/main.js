import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../libs/styles/index.scss'
import './assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
