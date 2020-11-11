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
  z-index: 1;
}
</style>
<template>
  <Page>

    <div slot="sidebar">
      <Tip title="Find and Replace">

        <p>Enter a search term in the search box to find existing episodes.
          You can enter arbitrary words and the description will be searched. Group words with quotation marks.
        </p>
        <p>
          You can use the <a
            href="https://lucene.apache.org/core/8_6_2/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package.description">Lucene
          Query Syntax</a>
          to search the database. There are several fields available to you including <code>description</code> and
          <code>title</code> that you can use in crafting your queries.
        </p>


      </Tip>
    </div>
    <Panel title="Search">

      <!--      -->
      <div class="panel__section"> Search</div>

      <form @submit.prevent="doSearch">
        <input id="search" v-model="query" class="form-control" type="text"/>
      </form>

      <div class="buttons">
        <a class="action action__main" href="" @click.prevent="doSearch">Go</a>
        <a class="action action__alternative" href="" @click.prevent="doClear">Clear</a>
      </div>
      <!--      -->
      <div v-if="podcasts.length > 0" class="panel__section">
        Showing {{ podcasts.length }} results
      </div>
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
    await this.doSearch()
  },
  methods: {
    async doClear() {
      this.query = null
      await this.doSearch()
    },
    async doSearch() {

      console.debug(`
        doSearch([ ${this.query}]).
        There are ${this.podcasts.length} podcasts.
      `)
      if (this.query === '' || this.query === null) {
        this.podcasts = await this.$root.$data.getPodcasts()
      } //
      else {
        this.podcasts = await this.$root.$data.searchPodcasts(this.query)
      }
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
