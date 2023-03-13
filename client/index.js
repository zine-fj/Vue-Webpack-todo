import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

// 声明app内容，并挂载到vue上
new Vue({
  render: (h) => h(App)
}).$mount(root)
