import Vue from 'vue';
import App from './App.vue';
import codeShow from './components/CodeShow.vue';
import ColorShow from './components/ColorShow.vue';
import router from './router';
import store from './store';
import cbUi from '../libs/index';

import '../libs/styles/index.scss';
import './assets/scss/index.scss';

Vue.config.productionTip = false;

Vue.use(cbUi);
Vue.component('code-show', codeShow);
Vue.component('color-show', ColorShow);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
