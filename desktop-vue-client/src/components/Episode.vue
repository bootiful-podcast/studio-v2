<template>

  <div class="search__result">

    <div class="search__result__photo"></div>
    <div class="search__result__title">
      {{ podcast.title }}
    </div>
    <div class="search__result__date"> {{ buildPresentableDate(podcast.date) }}</div>
    <div class="search__result__description">
      {{ podcast.description }}
    </div>

    <div class="search__result__actions">
      <a href="" class="action action__main">edit</a>
      <a href="" class="action action__alternative">open</a>
      <a href="" class="action action__alternative">delete</a>
      <a href="" class="action action__alternative">unpublish</a>
    </div>
  </div>

</template>
<script>
export default {
  name: 'Episode',
  props: ['podcast'],
  created() {

  },
  methods: {

    buildPresentableDate(existingDate) {
      return existingDate.split('T') [0]
    }

  },
  data() {
    return {}
  }
}
</script>
<style>
</style>
