import Vue from 'vue'
// import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import CreateEpisodePage from "@/pages/CreateEpisodePage";
import SearchPage from "@/pages/SearchEpisodePage";
import App from "@/App";
import LoginPage from "@/pages/LoginPage";

// import Vuex from 'vuex'
import LoginService from "./LoginService"
import PodcastService from "@/PodcastService";


Vue.config.productionTip = false


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
// Vue.use(Vuex)


/*
const store = new Vuex.Store({
  state: {
    search: {
      query: '',
      podcasts: []
    }
  },
  getters: {
    searchPodcasts: (state) => async (query) => {
      console.log('the current state is', state)
      console.log('searching for ', query)
      if (query == null) {
        return await podcastService.getPodcasts(  )
      }
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
*/

const rootUrl = ((u) => (u.endsWith('/')) ? u : u + '/')(process.env.VUE_APP_SERVICE_ROOT)
const loginService = new LoginService(rootUrl + 'token')
const podcastService = new PodcastService(rootUrl + 'podcasts', () => loginService.getUserToken())

const store = {
  session: {
    token: null,
    username: null
  },
  async login(username, password) {
    this.session.token = await loginService.login(username, password)
    this.session.username = username
    return this.session.token
  },
  async getPodcasts() {
    return await podcastService.getPodcasts()
  },
  async searchPodcasts(query) {
    return await podcastService.searchPodcasts(query)
  }
}
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/create', component: CreateEpisodePage},
    {path: '/search', component: SearchPage},
    {path: '/', component: LoginPage}
    // { path: '/bar', component: Bar },
    // { path: '/é', component: Unicode },
    // { path: '/query/:q', component: Query }
  ]
})


new Vue({
  router,
  data: store,
  // store: store,
  render: h => h(App)
}).$mount('#app')
