<template>


  <div v-bind:class="pageStyles ">

    <div class="user">

      <div v-if="$root.$data.session.username">
        hello, <span class="username">{{ $root.$data.session.username }}</span>
      </div>


    </div>

    <div class="header">
      <div class="logo" @click="goHome"></div>
    </div>

    <div class="sidebar">
      <nav class="menu">
        <router-link class="action action__main" to="/create">create</router-link>
        <router-link class="action action__main" to="/search"> search</router-link>

        <a v-if="$root.$data.session.username" class="action action__main" href="#" @click.prevent="logout()">logout</a>
      </nav>
      <slot name="sidebar"></slot>
    </div>

    <div class="content">
      <slot></slot>
    </div>
    <div v-bind:class="[ 'footer', {  production : isProduction() , development: isDevelopment()}]">
      <div class="server">
        <div class="server--url">
          {{ buildPresentableUrl($root.$data.service.url) }}
        </div>
        <div class="server--git-hash">
          <span style="font-size: smaller"> {{ gitHash }}  </span>
        </div>
        <div class="server--environment">
          <span style="font-size: smaller"> {{ $root.$data.service.environment }}  </span>
        </div>
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
    isProduction() {
      const x = this.$root.$data.service.environment === 'production'
      console.log('isProduction', x)
      return x
    },
    isDevelopment() {
      const x = this.$root.$data.service.environment === 'development'
      console.log('isDevelopment', x)
      return x

    },
    logout() {
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
    const env = this.$root.$data.service.environment
    return {
      environment: env,

      pageStyles: {
        screen: true,
        production: this.isProduction(),
        development: this.isDevelopment(),
      },
      gitHash: process.env.VUE_APP_GIT_HASH
    }
  }
}
</script>
<style>


.screen {
}

.server {

}


.footer.development  .server {
  color: white;
}
.footer.development {
  border-bottom: 10px solid white ;
}


.footer.production {
  border-bottom: 10px solid black;
}
.footer.production  .server {
  color: black;
}


.server--environment {
  font-weight: bold;
}


</style>
