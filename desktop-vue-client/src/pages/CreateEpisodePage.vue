<style>


.files-form {
  display: grid;
  grid-template-areas: "audio photo";
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
  background-image: url("../assets/file-upload.png");
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
        <P>This is the beginning of the line - you can create new episodes on this very page.</P>
      </Tip>
    </div>

    <Panel title="create">

      <form>
        <div class="panel__section"> Details</div>

        <div class="form-group">
          <label for="title" class="panel__prompt">
            Title
          </label>
          <b-form-input class="form-control" id="title" v-model="title"
                        placeholder="Enter the title for the new episode"></b-form-input>
        </div>
        <div class="form-group">
          <label for="description" class="panel__prompt">
            Description
          </label>
          <b-form-textarea
              v-model="description"
              placeholder="Describe the episode. Feel free to use Markdown."
              class="form-control" id="description"
          ></b-form-textarea>

        </div>


        <div class="panel__section">Files</div>

        <div class="files-form">
          <div class="audio-files">

            <div class="form-group">
              <label for="introduction" class="panel__prompt">
                Introduction Audio <span class="file-type">(.MP3)</span>
              </label>


              <b-form-file class="introduction-upload upload-drop-zone-audio"
                           id="introduction"
                           accept=".jpg, .png, .gif">
              </b-form-file>

            </div>

            <div class="form-group">
              <label for="interview" class="panel__prompt">
                Interview Audio <span class="file-type">(.MP3)</span>
              </label>
              <b-form-file class="introduction-upload upload-drop-zone-audio"
                           id="interview"
                           accept=".jpg, .png, .gif"></b-form-file>


            </div>
          </div>

          <div class="profile-photo-file">
            <div class="form-group">
              <label for="photo" class="panel__prompt profile-photo-file--prompt">
                Profile Photo <span class="file-type">(.JPG)</span>
              </label>
              <!--   <FileUploadDropZone @files-dropped="handleUpload" id="photo" class="profile-photo-file&#45;&#45;upload"/>-->

              <b-form-file class="introduction-upload profile-photo-file--upload "
                           id="introduction"
                           accept=".jpg, .png, .gif">
              </b-form-file>
            </div>
          </div>
        </div>

        <div class="buttons">
          <a href="" class="action action__alternative">Cancel</a>
          <a href="" @click.prevent="createEpisode" class="action action__main">Create</a>
        </div>
      </form>


    </Panel>


  </Page>
</template>
<script>


import Page from "@/components/Page";
import Panel from "@/components/Panel";
import Tip from "@/components/Tip";
import JSZip from "jszip";
import {saveAs} from 'file-saver';

export default {
  name: 'CreateEpisodePage',
  mounted() {
  },
  created() {
    console.log('starting ' + this.$options.name)

  },
  methods: {

    async createEpisode() {
      console.log('creating episode...')

      const zip = new JSZip();
      zip.file("Hello.txt", "Hello world\n");
      const blob = await zip.generateAsync({type: "blob"})
      // .then(function (blob) {
      saveAs(blob, "hello.zip");
      // });


    },


    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    ,

    async uploadFileDataToServer(mapOfFileKeysToFiles) {
      const formData = new FormData()
      const uid = this.uuidv4()
      console.log('the UUID is', uid)
      for (let fileFieldNameForUpload in mapOfFileKeysToFiles) {
        formData.append(fileFieldNameForUpload, mapOfFileKeysToFiles [fileFieldNameForUpload])
      }

      console.log(formData)
      const response = await fetch('http://localhost:8080/test-upload/' + uid, {
        method: 'POST',
        body: formData
      })
      console.log(response)
      console.log('finished upload...')


    }
    ,


  }
  ,
  data() {
    return {

      title: '',
      description: ''
    }
  }
  ,
  components: {
    Tip,
    Panel,
    Page
  }
}
</script>
