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
import LoginService from "./LoginService"
import SearchService from "@/SearchService";
import EpisodeService from "@/EpisodeService";

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

const rootUrl = ((u) => (u.endsWith('/')) ? u : u + '/')(process.env.VUE_APP_SERVICE_ROOT)
const tokenSupplier = () => loginService.getUserToken()
const loginService = new LoginService(rootUrl + 'token')
const episodeService = new EpisodeService(rootUrl, tokenSupplier)
const searchService = new SearchService(rootUrl + 'podcasts', tokenSupplier)

const gitHash = process.env.VUE_APP_GIT_HASH

console.log('the git revision is ', gitHash)

function sortPodcastsByDateMostRecentFirst(results) {
  function dateIndex(dateStr) {
    return dateStr.split('T')[0]
  }

  results.sort((a, b) => dateIndex(a.date).localeCompare(dateIndex(b.date)))
  results.reverse()
  return results
}

const store = {

  service: {
    url: rootUrl
  },

  session: {
    token: null,
    username: null
  },

  async createEpisode(uid, title, description, intro, interview, photo, callbackOnCompletion) {
    await episodeService.createEpisode(uid, title, description, intro, interview, photo, callbackOnCompletion)
  },


  async logout() {
    await loginService.logout()
    this.session.token = null
    this.session.username = null
  },

  async restoreSession(token, username) {
    this.session.token = token
    this.session.username = username
    return this.session.token
  },

  async authenticate(username, password) {
    this.session.token = await loginService.login(username, password)
    this.session.username = username.toLowerCase()
    return this.session.token
  },

  async getPodcasts() {
    return sortPodcastsByDateMostRecentFirst(await searchService.getPodcasts())
  },

  async searchPodcasts(query) {
    return sortPodcastsByDateMostRecentFirst(await searchService.searchPodcasts(query))
  }

}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/create', component: CreateEpisodePage, meta: {authenticated: true}},
    {path: '/search', component: SearchPage, meta: {authenticated: true}},
    {path: '/', component: LoginPage, meta: {authenticated: false}},
  ]
})


router.beforeEach(async (to, from, next) => {

  const token = loginService.getUserToken();
  if (token == null) {
    if (to.matched.some(record => record.meta.authenticated && record.meta.authenticated === true)) {

      console.info('login required:', next, ' ', to, ' ', from)

      next({
        path: '/',
        query: {nextUrl: to.fullPath}
      });

    }//
  }//
  else {
    await store.restoreSession(token.token, token.username)
  }
  next()
});


new Vue({router, data: store, render: h => h(App)}).$mount('#app')
