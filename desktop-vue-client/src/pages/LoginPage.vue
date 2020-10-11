<style>
</style>
<template>
  <Page>

    <div slot="sidebar">

      <Tip title="Login">
        Start here.
      </Tip>

    </div>
    <Panel title="Login">
      <Login v-on:authentication-attempt="myCallback"/>
    </Panel>
  </Page>
</template>
<script>


import Page from "@/components/Page";
import Panel from "@/components/Panel";
import Tip from "@/components/Tip";
import Login from "@/components/Login";

export default {

  name: 'LoginPage',

  mounted() {
  },

  created() {
    console.log('starting ' + this.$options.name)
  },

  methods: {
    async myCallback(authAttempt) {
      const auth = await this.$root.$data.authenticate(authAttempt.username, authAttempt.password)
      this.$emit('authentication-success', auth)
      const q = this.$route.query
      console.log('params:', q, 'nextUrl:', q.nextUrl)
      if (q.nextUrl != null) {
        await this.$router.push(q.nextUrl)
      } //
      else {
        await this.$router.push('/search')
      }
    }
  },

  data() {
    return {}
  },

  components: {
    Login,
    Tip,
    Panel,
    Page
  }
}
</script>
