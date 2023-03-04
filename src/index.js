import Vue from 'vue';
import App from './app.vue'

import './assets/styles/test.css'
import './assets/images/37191.png'
import './assets/styles/test-stylus.styl'

const root = document.createElement('div');
document.body.appendChild(root)

// 声明app内容，并挂载到vue上
new Vue({
  render: (h) => h(App),
}).$mount(root)