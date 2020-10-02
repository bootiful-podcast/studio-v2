<template>
  <div class="panel">
    <slot name="title">
      <div class="panel__title"> {{ titleText }}</div>
    </slot>
    <div class="panel__body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Panel',
  props: ['titleText'],
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
