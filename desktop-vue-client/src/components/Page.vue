<template>


  <div class="screen">

    <div class="header">
      <div class="logo"></div>
    </div>

    <div class="sidebar">
      <nav class="menu">
        <a class="action action__main" href="#">create</a>
        <a class="action action__main" href="#">manage</a>
      </nav>

      <slot name="sidebar"> </slot>
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
<style  >
</style>
