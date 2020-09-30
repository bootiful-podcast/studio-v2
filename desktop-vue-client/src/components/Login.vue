<template>
    <form>
        <div class="form-group">
            <label for="emailField">Username:</label>
            <input type="email" class="form-control"
                   v-model="input.username" id="emailField"/>
        </div>
        <div class="form-group">
            <label for="passwordField">Password:</label>
            <input type="password" class="form-control"
                   v-model="input.password" id="passwordField"/>
        </div>
        <button type="submit"
                @click.prevent="loginAttempt"
                class="btn btn-primary">Submit
        </button>
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
          console.debug('attempting authentication...');
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
