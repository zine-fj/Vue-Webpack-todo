import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test.css'
import './assets/images/1.png'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: h => (App)
}).$mount(root)
