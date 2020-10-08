<style>

</style>
<template>
  <Page>

    <div slot="sidebar">
      <Tip title="Every Journey...">
        This is the beginning of the line - you can
        create new episodes on this very page.
      </Tip>
    </div>

    <Panel title="create">
      this is the body of a panel
    </Panel>


  </Page>
</template>
<script>


import Page from "@/components/Page";
import Panel from "@/components/Panel";
import Tip from "@/components/Tip";

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
    Tip,
    Panel,
    Page
  }
}
</script>
