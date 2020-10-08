<style>


.files-form {
  display: grid;
  grid-template-areas: "audio photo  ";
  grid-template-rows:  auto;
  grid-template-columns: auto 200px;
}

.audio-files {
  margin-right: var(--panel__margin);
  grid-area: audio;
}


.profile-photo-file {
  grid-area: photo;
  display: grid;
}

.profile-photo-file--prompt {
}

.profile-photo-file--upload {
  min-height: 80%;
}

.introduction-upload {
}

.interview-upload {
}

.upload-drop-zone {
  background-size: 35px;
  background-position-x: center;
  background-position-y: center;
  background-image:  url("../assets/file-upload.png");
  background-repeat: no-repeat;
  vertical-align: center;
}

.upload-drop-zone-dropped {
  background-color: grey;
}

.upload-drop-zone-audio {
  background-position-x: right;
}

.upload-drop-zone-photo {
}

.upload-drop-zone:before {
  content: 'drag a file here.';
  display: block;
  text-align: center;
  color: var(--clr-gray-darker)
}

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

      <form>
        <div class="panel__section"> Details</div>

        <div class="form-group">
          <label for="title" class="panel__prompt">
            Title
          </label>
          <input type="text" class="form-control" id="title"/>
        </div>
        <div class="form-group">
          <label for="description" class="panel__prompt">
            Description
          </label>
          <textarea class="form-control" id="description"></textarea>
        </div>


        <div class="panel__section">Files</div>

        <div class="files-form">
          <div class="audio-files">

            <div class="form-group">
              <label for="description" class="panel__prompt">
                Introduction Audio <span class="file-type">(.MP3)</span>
              </label>
              <div type="text"
                   class="form-control upload-drop-zone upload-drop-zone upload-drop-zone-audio introduction-upload"
                   id="introduction"></div>
            </div>

            <div class="form-group">
              <label for="description" class="panel__prompt">
                Interview Audio <span class="file-type">(.MP3)</span>
              </label>
              <div class="interview-upload  form-control upload-drop-zone upload-drop-zone-audio   "
                   id="interview">
              </div>
            </div>
          </div>

          <div class="profile-photo-file">
            <div class="form-group">
              <label for="photo" class="panel__prompt profile-photo-file--prompt">
                Profile Photo <span class="file-type">(.JPG)</span>
              </label>
              <div class="profile-photo-file--upload form-control upload-drop-zone upload-drop-zone-photo   "
                   id="photo">
              </div>
            </div>
          </div>
        </div>

        <div class="buttons">
          <a href="" class="action action__alternative">Cancel</a>
          <a href="" class="action action__main">Create</a>
        </div>
      </form>

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
