<style>

</style>
<template>
  <Page>

    <div slot="sidebar">
      sss

    </div>

    <Panel title ="create">
      this is the body of a panel
    </Panel>


  </Page>
</template>
<script>


import Page from "@/components/Page";
import Panel from "@/components/Panel";

export default {
  name: 'CreateEpisodePage',
  mounted() {
  },
  created() {
    console.log('starting ' + this.$options.name)
  },
  methods: {},
  data() {


    return {
      count: 0,
      showSearch: true,
      account: {}
    }
  },
  components: {
    Panel,
    Page
  }
}
</script>
