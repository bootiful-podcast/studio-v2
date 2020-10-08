<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;700;900&display=swap');
@import url('App.css');
</style>
<template>
  <router-view @authentication-attempt="afterAuthentication">
  </router-view>
</template>
<script>


import LoginService from "./LoginService"
import PodcastService from "@/PodcastService";

const rootUrl = ((u) => (u.endsWith('/')) ? u : u + '/')(process.env.VUE_APP_SERVICE_ROOT)
const loginService = new LoginService(rootUrl + 'token')
const podcastService = new PodcastService(rootUrl + 'podcasts', () => loginService.getUserToken())

export default {
  name: 'App',

  mounted() {
    this.$on('authentication-success', async (authenticatedUser) => {
      console.info(authenticatedUser, 'has been found')
      const podcasts = await podcastService.getPodcasts()
      console.log(podcasts)
    })
  },

  created() {
    console.log('Launching BootifulPodcast.fm Desktop Client')
  },

  methods: {

    async afterAuthentication(authentication) {
      console.debug(`authenticated: ${authentication.username}`)
      const result = await loginService.login(authentication.username, authentication.password)
      this.$emit("authentication-success", result)
    }
  },

  data() {
    return {}
  },

  components: {}

}
</script>
