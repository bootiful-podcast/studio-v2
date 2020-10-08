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
    this.$on('authentication-success', (authenticatedUser) => {
      console.info(authenticatedUser, 'has been found')
      podcastService
          .getPodcasts()
          .then((podcasts) => {
            Array.of(podcasts).forEach(podcast => console.log(podcast))
          })
          .catch((exception) => console.error(`could not fetch the episodes: ${exception.toString()}`))
    })
  },

  created() {
    console.log('Launching BootifulPodcast.fm Desktop Client')
  },

  methods: {

    afterAuthentication(authentication) {
      console.info(`authenticated: ${authentication.username}`)
      loginService
          .login(authentication.username, authentication.password)
          .then(() => {
            this.$emit("authentication-success", authentication)
          })
          .catch((exception) => {
            console.error(`could not login: ${exception.toString()} `)
          })
    }
  },

  data() {
    return {}
  },

  components: {}

}
</script>
