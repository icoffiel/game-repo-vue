import Vue from 'vue';
import VueRouter from 'vue-router';
import VuewResource from 'vue-resource';

import App from './App';
import Hello from './components/Hello';
import Platform from './components/Platform';

Vue.use(VueRouter);
Vue.use(VuewResource);

const routes = [
  { path: '/', component: Hello },
  { path: '/platform', component: Platform },
];

const router = new VueRouter({
  routes,
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
