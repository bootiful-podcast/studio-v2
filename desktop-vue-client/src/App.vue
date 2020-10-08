<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;700;900&display=swap');
@import url('App.css');
</style>
<template>
  <router-view
      @authentication-attempt="afterAuthentication"

  >
  </router-view>
</template>
<script>

export default {
  name: 'App',

  mounted() {
    // eslint-disable-next-line no-unused-vars
    this.$on('authentication-success', async (authenticatedUser) => {
      // const podcasts =
      // console.log(podcasts)
    })
  },

  created() {
    console.log('Launching BootifulPodcast.fm Studio')
  },

  methods: {

    // eslint-disable-next-line no-unused-vars
    async afterAuthentication(authentication) {
      // const result = await loginService.login(authentication.username, authentication.password)
      // this.$emit("authentication-success", result)
    }
  },

  data() {
    return {}
  },

  components: {}

}
</script>
