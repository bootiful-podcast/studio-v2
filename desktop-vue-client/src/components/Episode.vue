<template>

  <div class="search__result">

    <div class="search__result__photo" v-bind:style="backgroundImageUrl"></div>
    <div class="search__result__title">
      {{ podcast.title }}
    </div>
    <div class="search__result__date"> {{ buildPresentableDate(podcast.date) }}</div>
    <div class="search__result__description">
      <div v-html="podcast.htmlDescription"> </div>
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
    return {
      backgroundImageUrl: `background-image: url("${this.podcast.podbeanPhotoUri}")`
    }
  }
}
</script>
<style>
</style>
