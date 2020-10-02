<template>


  <div class="screen">

    <div class="header">
      <div class="logo"></div>
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
    <div class="footer"></div>

  </div>


</template>
<script>
export default {
  name: 'Page',
  created() {

  },
  methods: {},
  data() {
    return {}
  }
}
</script>
<style>
</style>
