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
      const auth = await this.$root.$data.login(authAttempt.username, authAttempt.password)
      console.log( this.$root.$data.session.username)
      console.log( this.$root.$data.session.token )
      this.$emit('authentication-success', auth)
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
