<style>
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
      this is the body of a panel
    </Panel>
  </Page>
</template>
<script>


import Page from "@/components/Page";
import Panel from "@/components/Panel";
import Tip from "@/components/Tip";

export default {
  name: 'SearchEpisodePage',
  mounted() {
  },
  created() {
    console.log('starting ' + this.$options.name)
  },
  methods: {},
  data() {
    return {}
  },
  components: {
    Tip,
    Panel,
    Page
  }
}
</script>
