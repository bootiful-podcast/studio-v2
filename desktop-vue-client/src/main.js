import Vue from 'vue'
// import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import EditorApp from "./App";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.config.productionTip = false


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(EditorApp),
}).$mount('#app')
