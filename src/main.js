import Vue from 'vue'
import App from './pages/App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store/robots';
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
