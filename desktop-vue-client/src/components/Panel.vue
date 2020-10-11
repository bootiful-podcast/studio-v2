<template>
  <div class="panel">
    <slot name="title">
      <div class="panel__title"> {{ title }}</div>
    </slot>
    <div class="panel__body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Panel',
  props: ['title'],
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
