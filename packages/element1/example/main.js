import Vue from "vue";
import App from "./app.vue";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Element1 from '../src'
import '../packages/styles/index.scss'
Vue.use(ElementUI)
Vue.use(Element1)
new Vue({
  render: (h) => h(App),
}).$mount("#app");

