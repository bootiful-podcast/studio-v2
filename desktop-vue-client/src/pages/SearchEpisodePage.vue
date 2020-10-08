<style>


.search__result {
  margin-top: var(--panel__margin);
  background-color: var(--clr-gray);
  margin-right: calc(-1 * var(--panel__margin));
  margin-left: calc(-1 * var(--panel__margin));
  padding: var(--panel__margin);
}

.search__result {

  display: grid;
  grid-template-areas:
                      "photo title date"
                      "photo description description"
                      "photo actions actions";
  grid-template-columns:  200px 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  margin-top: calc(.5 * var(--panel__margin));
  margin-bottom: 0;
  padding-bottom: 0;
  padding-top: 0;
  z-index: -10;
}


.search__result__actions {
  grid-area: actions;
  background-color: var(--clr-gray-darker);
  font-size: smaller;
  text-align: right;
  padding-right: var(--panel__margin);
  margin-right: calc(-1 * var(--panel__margin));
  margin-left: calc(-1 * (200px + (1.0 * var(--panel__margin))));
  line-height: 1;
  padding-top: calc(.3 * var(--panel__margin));
  /*line-height: calc(1.1 * var(--larger-text-line-height));*/

}


.search__result__actions .action {
  color: white;
}

.search__result__description {
  grid-area: description;
  margin-left: calc(.5 * var(--panel__margin));
}

.search__result__date {
  grid-area: date;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--clr-gray-darker);
  text-align: right;
  padding-top: calc(.5 * var(--panel__margin));
}

code {
  color: white;
  font-weight: bold;
}

.search__result__title {
  grid-area: title;
  font-size: larger;
  margin-left: calc(.5 * var(--panel__margin));
  font-weight: 700;
  padding-top: calc(.5 * var(--panel__margin));
}

.search__result__photo {
  height: 200px;
  width: 200px;
  background-size: cover;
  grid-area: photo;
  /*background-image: url('http://bootifulpodcast.fm/episode-photos/d8b01a23-a4d1-479d-85f6-52d0485dc6c2.jpg');*/
  z-index: 1;
}
</style>
<template>
  <Page>

    <div slot="sidebar">
      <Tip title="This is your one-stop shop to search, edit, or delete episodes:">
        <UL>
          <LI>Enter a search term in the searchbox to find existing episodes
          </LI>
          <LI> Click EDIT to update an episode, or DELETE to delete an episode.</LI>
        </UL>
      </Tip>
    </div>
    <Panel title="Search">

      <!--      -->
      <div class="panel__section"> Search</div>
      <input type="text" class="form-control" v-model="query" id="search"/>
      <div class="buttons">
        <a @click.prevent="doSearch" class="action action__main">Go</a>
      </div>

      <!--      -->
      <div class="panel__section"> Results</div>
      <div v-for="podcast in podcasts" v-bind:key="podcast.uid">
        <Episode v-bind:podcast="podcast"/>
      </div>

    </Panel>
  </Page>
</template>
<script>


import Page from "@/components/Page";
import Panel from "@/components/Panel";
import Tip from "@/components/Tip";
import Episode from "@/components/Episode";

export default {
  name: 'SearchEpisodePage',
  mounted() {
  },
  async created() {
    console.log('starting ' + this.$options.name)
  },
  methods: {
    async doSearch() {
      console.log('doSearch([' + this.query + '])')
      if (this.query === '' || this.query === null) {
        this.podcasts = await this.$root.$data.getPodcasts()
      } //
      else {
        this.podcasts = await this.$root.$data.searchPodcasts(this.query)
      }
      console.log('there are ', this.podcasts.length, 'podcasts')
    }
  },
  data() {
    return {
      query: '',
      podcasts: []
    }
  },
  components: {
    Tip,
    Panel,
    Page,
    Episode
  }
}
</script>
