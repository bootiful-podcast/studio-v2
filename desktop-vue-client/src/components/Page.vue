<template>


  <div class="screen">

    <div class="user">

      <span v-if="$root.$data.session.username">
        hello,
        <span class="username">
          {{ $root.$data.session.username }}
        </span>
        <!--<router-link class="action action__main " to="/login" @click="logout">logout</router-link>-->
        (
        <a href="#" @click.prevent="logout()">logout</a>
        )
      </span>


    </div>

    <div class="header">
      <div class="logo" @click="goHome"></div>
    </div>

    <div class="sidebar">
      <nav class="menu">
        <router-link class="action action__main" to="/create">create</router-link>
        <router-link class="action action__main" to="/search"> search</router-link>
      </nav>
      <slot name="sidebar"></slot>
    </div>

    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">


      <div class="server">
        <span class="server--url"> {{ buildPresentableUrl($root.$data.service.url) }}  </span>
      </div>

    </div>

  </div>


</template>
<script>
export default {
  name: 'Page',
  created() {
  },
  methods: {
    logout (){
      this.$root.$data.logout()
      this.$router.push('/')
    },
    buildPresentableUrl(url) {
      function stripPrefix(urlToStrip) {
        const prefixes = ['http://', 'https://']
        for (let index in prefixes) {
          const prefix = prefixes [index];
          if (urlToStrip.startsWith(prefix.toLowerCase())) {
            return urlToStrip.substring(prefix.length)
          }
        }
      }
      const lowerCase = url.toString().toLowerCase();
      const stripped = stripPrefix(lowerCase)
      if (stripped.endsWith('/')) {
        return stripped.substring(0, stripped.length - 1)
      }
      return stripped
    },
    goHome() {
      this.$router.push('/')
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
</style>
