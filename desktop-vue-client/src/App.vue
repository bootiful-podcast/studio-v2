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


const rootUrl = ((u) => (u.endsWith('/')) ? u : u + '/')(process.env.VUE_APP_SERVICE_ROOT)
const loginService = new LoginService(rootUrl + 'token')


export default {
  name: 'App',
  mounted() {

  },
  created() {
    console.log('Launching BootifulPodcast.fm Desktop Client')
  },
  methods: {


    afterAuthentication(authentication) {
      loginService
          .login(authentication.username, authentication.password)
          .then(user => {
            this.$emit("authentication-success", user)
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
