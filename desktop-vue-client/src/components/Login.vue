<template>
  <form>
    <div class="form-group">
      <label class="panel__prompt" for="emailField">Username:</label>
      <input type="email" class="form-control"
             v-model="input.username" id="emailField"/>
    </div>
    <div class="form-group">
      <label class="panel__prompt" for="passwordField">Password:</label>
      <input type="password" class="form-control"
             v-model="input.password" id="passwordField"/>
    </div>
    <div class="buttons">
      <a href="" @click.prevent="loginAttempt"
         class="action action__main">Submit</a>
    </div>
  </form>
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
      console.log("The username and / or password are empty");
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
