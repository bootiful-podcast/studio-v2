<template>
  <div>
    <form @submit.prevent="loginAttempt">
      <div class="form-group">
        <label class="panel__prompt" for="emailField">Username:</label>
        <input id="emailField" v-model="input.username"
               class="form-control" type="text"/>
      </div>
      <div class="form-group">
        <label class="panel__prompt" for="passwordField">Password:</label>
        <input id="passwordField" v-model="input.password"
               class="form-control" type="password"/>
      </div>
      <div class="hidden-submit"><input tabindex="-1" type="submit"/></div>

    </form>
    <div class="buttons">
      <a class="action action__main" href="#" @click.prevent="loginAttempt">Submit</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',

  created() {

  },
  methods: {

    loginAttempt() {
      function isNonEmpty(str) {
        return str && (typeof str === 'string') && str.trim().length > 0;
      }

      const username = this.input.username;
      const pw = this.input.password;
      if (isNonEmpty(username) && isNonEmpty(pw)) {
        this.$emit("authentication-attempt", {username: username, password: pw});
        return;
      }

    }
  },
  data() {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  }
}
</script>
<style scoped>
</style>
