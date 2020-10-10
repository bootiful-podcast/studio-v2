<template>
  <div
      @dragover.prevent="dragoverHandler"
      @drop.prevent="dropHandler"
      @dragleave.prevent="dragleaveHandler"
      class="form-control upload-drop-zone  ">


  </div>
</template>
<script>

export default {
  name: 'FileUploadDropZone',
  // props: ['podcast'],
  created() {
  },
  methods: {
    dragleaveHandler() {
    },
    dragoverHandler() {
    },
    dropHandler(event) {
      const files = Array
          .from(event.dataTransfer.items)
          .filter(fileItem => fileItem.kind === 'file')
      console.log('there are ', files.length, 'files.')
      files.forEach(fileItem => this.handleFileCallback(fileItem))
    },
    handleFileCallback(dateTransferItem) {
      const file = dateTransferItem.getAsFile();
      console.log(file)
      this.$emit('file-dropped', dateTransferItem)
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
</style>
