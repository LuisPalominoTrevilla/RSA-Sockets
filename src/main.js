import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import router from '@/router.js';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h('router-view')
}).$mount('#app')
