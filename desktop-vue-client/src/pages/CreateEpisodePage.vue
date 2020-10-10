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



.profile-photo-file--upload-preview {
  margin-top: calc(var(--panel__margin)  / 2 );
  width: 200px;
  height: auto;
  min-height: 200px ;
  z-index: 1;
  background-size: cover;
  background-position-x: center;
  background-repeat: no-repeat;
  background-color: var(  --clr-gray );
  background-image: url("../assets/missing-image.png");


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


              <b-form-file class="  introduction-upload upload-drop-zone-audio"
                           id="introduction"
                           v-model="files.introduction"
                              accept=".jpg, .png, .gif">
              </b-form-file>

            </div>

            <div class="form-group">
              <label for="interview" class="panel__prompt">
                Interview Audio <span class="file-type">(.MP3)</span>
              </label>
              <b-form-file class="introduction-upload upload-drop-zone-audio"
                           id="interview"
                           v-model="files.interview"
                           accept=".jpg, .png, .gif"></b-form-file>


            </div>
          </div>

          <div class="profile-photo-file">
            <div class="form-group">
              <label for="photo" class="panel__prompt profile-photo-file--prompt">
                Profile Photo <span class="file-type">(.JPG)</span>
              </label>
              <b-form-file
                  class="introduction-upload "
                  id="photo"

                  v-model="files.photo"
                  @input="previewProfilePhoto"
                  accept=".jpg, .png, .gif"
              />
              <div class="profile-photo-file--upload-preview upload-drop-zone" v-bind:style="backgroundImageUrl"></div>
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

export default {
  name: 'CreateEpisodePage',
  mounted() {
  },
  created() {
    console.log('starting ' + this.$options.name)

  },
  methods: {

    async createEpisode() {


      /*

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);

      * */

      console.log('create new episode....')

      const zip = new JSZip();
      console.log(zip)
      // zip.file("Hello.txt", this.files.introduction.getA);
      // zip.file("Hello.txt", "Hello world\n");
      //const blob = await zip.generateAsync({type: "blob"})
      // saveAs(blob, "to-upload.zip");


    },
    previewProfilePhoto(event) {
      // todo make this a little more elegant right now its hideous!
      console.log('the profile photo property is ', this.files.photo)
      console.log('trying to compute url ', event)

      const reader = new FileReader();
      reader.addEventListener('load', (theFile) => {
        /*const span = document.createElement('span');
        span.innerHTML = ` <img src="${theFile.target.result}" title = "${escape(theFile.name)}" />         `
        this.$refs['photoPreview'].appendChild(span)*/
        this.backgroundImageUrl = `background-image: url("${theFile.target.result}")`

      })

      reader.readAsDataURL(this.files.photo);

    },
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
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
    },
  },
  data() {
    return {

      files: {
        interview: null,
        introduction: null,
        photo: null
      },

      backgroundImageUrl: '',
      title: '',
      description: ''
    }
  },
  components: {
    Tip,
    Panel,
    Page
  }
}
</script>
