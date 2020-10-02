<template>


  <div class="tip">
    <h1> {{ title }}</h1>
    <slot></slot>
  </div>

</template>
<script>
export default {
  name: 'Tip' ,
  props: ['title']
}
</script>
<style>
</style>
