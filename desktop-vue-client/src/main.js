import Vue from 'vue'
// import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import CreateEpisodePage from "@/pages/CreateEpisodePage";
import SearchPage from "@/pages/SearchEpisodePage";
import App from "@/App";



Vue.config.productionTip = false


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/create', component: CreateEpisodePage},
    {path: '/search', component: SearchPage},
    {path: '/', component: SearchPage}
    // { path: '/bar', component: Bar },
    // { path: '/é', component: Unicode },
    // { path: '/query/:q', component: Query }
  ]
})


new Vue({
  router,
  render: h => h( App)
}).$mount('#app')
