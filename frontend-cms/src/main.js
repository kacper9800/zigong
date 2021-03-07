import Vue from 'vue';
import App from './app';
import router from '@router';
import store from '@state/store';
import Antd from 'ant-design-vue';
import VueToast from 'vue-toast-notification';
import Vuelidate from 'vuelidate';
import InfiniteLoading from 'vue-infinite-loading';

import '@assets/styles/main.scss';
import 'ant-design-vue/dist/antd.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import '../bootstrap/axios.config';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.use(Antd);
Vue.use(VueToast);
Vue.use(Vuelidate);
Vue.use(InfiniteLoading);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
