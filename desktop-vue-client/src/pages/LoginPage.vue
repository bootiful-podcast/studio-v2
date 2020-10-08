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

    myCallback(authAttempt) {
      console.info('going to propagate auth attempt for auth', authAttempt)
      this.$emit("authentication-attempt", authAttempt)
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
