<style scoped>
.search-panel {
  padding-bottom: 1em;
  padding-top: 1em;
}
</style>
<template>
  <div class="search-panel">
    <form>
      <div class="form-group">
        <label for="searchQuery">Query</label>
        <input id="searchQuery"
               v-model="search.query"
               class="form-control"
               placeholder="Query"
               type="text">
      </div>
      <div class="form-group">
        <label for="startDate">Start Date </label>
        <DatePick id="startDate" v-model="search.start" class="form-control"/>
      </div>
      <div class="form-group">
        <label for="startDate">Stop Date </label>
        <DatePick id="stopDate" v-model="search.stop" class="form-control"/>
      </div>
      <div class="form-check">
        <input id="searchErrors"
               v-model="search.errors"
               class="form-check-input"
               type="checkbox">
        <label class="form-check-label" for="searchErrors">
          Show only those needing review
        </label>
      </div>
      <div class="mt-2">
        <b-button class="mr-1" title="Search" @click.prevent="onSearchChange">
          <b-icon aria-hidden="true" icon="search"></b-icon>
        </b-button>
        <b-button class="mr-1" title="Clear" @click.prevent="clearSearch">
          <b-icon aria-hidden="true" icon="file-earmark"></b-icon>
        </b-button>
        <b-button class="mr-1" title="Export to Markdown File" @click.prevent="exportToMarkdown">
          <b-icon aria-hidden="true" icon="cloud-download"></b-icon>
        </b-button>


      </div>
    </form>
  </div>

</template>
<script>
import SearchQuery from "../../SearchQuery"
import DatePick from "../util/DatePick";

export default {
  components: {DatePick},
  name: 'Search',
  props: ['query', 'stop', 'start', 'errors'],
  watch: {
    /*
      whenever the property called 'value' is changed
      externally, we want to refresh our view of that property
     */
    query: function (/* newValue*/) {
    },
    errors: function (/* newValue*/) {
    },
    start: function (/* newValue*/) {
    },
    stop: function (/* newValue*/) {
    }
  },
  methods: {
    dateChanged() {
    },
    exportToMarkdown() {
      //todo parameterize this so that the same event can be used to drive
      // the creation of a download _OR_ handle search results.
      this.$emit('export-search', this.search);
    },
    onSearchChange() {
      this.$emit('search-parameters-changed', this.search);
    },
    clearSearch() {
      this.search = new SearchQuery(this.query, this.errors, this.start, this.stop)
      this.$emit('search-parameters-cleared', this.search);
    }
  },
  data() {
    return {
      startDate: null,
      search: new SearchQuery(this.query, this.errors, this.start, this.stop)
    };
  },
}
</script>
