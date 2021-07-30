import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import i18n from './language/i18n';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';
import {
  dateFormat,
} from './libs/util.js';

// require styles
import './styles/common.scss';
import './styles/element-variables.scss';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;

Vue.filter('dateFormat', dateFormat);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
