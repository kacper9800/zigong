import Vue from 'vue';
import App from './app';
import router from './router';
import store from './state/store';
import '../bootstrap/axios.config';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vuelidate from 'vuelidate';
import './assets/styles/main.scss';
import InfiniteLoading from 'vue-infinite-loading';

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production';

// Ignore element stream

Vue.use(Antd);
Vue.use(VueToast);
Vue.use(Vuelidate);
Vue.use(InfiniteLoading);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
