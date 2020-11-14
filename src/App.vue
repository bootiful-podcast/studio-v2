<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;700;900&display=swap');
@import url('App.css');
</style>
<template>
  <router-view>
  </router-view>
</template>
<script>

export default {
  name: 'App',

  mounted() {
  },

  created() {
    console.info('Launching BootifulPodcast.fm Studio')
  },

  methods: {},

  data() {
    return {
    }
  },

  components: {}

}
</script>
