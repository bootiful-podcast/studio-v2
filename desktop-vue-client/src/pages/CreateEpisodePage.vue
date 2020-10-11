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
  margin-top: calc(var(--panel__margin) / 2);
  width: 200px;
  height: auto;
  min-height: 200px;
  z-index: 1;
  background-size: cover;
  background-position-x: center;
  background-repeat: no-repeat;
  background-color: var(--clr-gray);
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
          <label class="panel__prompt" for="title">
            Title
          </label>
          <b-form-input id="title" v-model="title" class="form-control"
                        placeholder="Enter the title for the new episode"></b-form-input>
        </div>
        <div class="form-group">
          <label class="panel__prompt" for="description">
            Description
          </label>
          <b-form-textarea
              id="description"
              v-model="description"
              class="form-control" placeholder="Describe the episode. Feel free to use Markdown."
          ></b-form-textarea>

        </div>


        <div class="panel__section">Files</div>

        <div class="files-form">
          <div class="audio-files">

            <div class="form-group">
              <label class="panel__prompt" for="introduction">
                Introduction Audio <span class="file-type">(.MP3)</span>
              </label>


              <b-form-file id="introduction"
                           v-model="files.introduction"
                           class="  introduction-upload upload-drop-zone-audio">
                           accept=".mp3"
              </b-form-file>

            </div>

            <div class="form-group">
              <label class="panel__prompt" for="interview">
                Interview Audio <span class="file-type">(.MP3)</span>
              </label>
              <b-form-file id="interview"
                           v-model="files.interview"
                           accept=".mp3"
                           class="introduction-upload upload-drop-zone-audio"></b-form-file>


            </div>
          </div>

          <div class="profile-photo-file">
            <div class="form-group">
              <label class="panel__prompt profile-photo-file--prompt" for="photo">
                Profile Photo <span class="file-type">(.JPG)</span>
              </label>
              <b-form-file
                  id="photo"
                  v-model="files.photo"
                  accept=".jpg"
                  class="introduction-upload "
                  @input="previewProfilePhoto"
              />
              <div class="profile-photo-file--upload-preview upload-drop-zone" v-bind:style="backgroundImageUrl"></div>
            </div>
          </div>
        </div>

        <div class="buttons">
          <a class="action action__alternative" href="">Cancel</a>
          <a class="action action__main" href="" @click.prevent="createEpisode">Create</a>
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
    console.debug('starting ' + this.$options.name)

  },
  methods: {


    buildManifestXml(uid, title, description, introductionFileName, interviewFileName, photoJpg) {
      const parser = new DOMParser();
      const xmlString =
          `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <podcast title="this is the title" uid="9c88cd9c-d071-4a0e-bd6a-b6b96b3cc53b">
        <interview src="interview.mp3"/>
        <introduction src="intro.mp3"/>
        <photo src="photo.jpg"/>
        <description>
        <![CDATA[this is the description. _Now is the time_ for all things.]]>
        </description>
        </podcast>
      `.trim()
      const serializer = new XMLSerializer()
      const doc = parser.parseFromString(xmlString, 'application/xml')
      doc.getElementsByTagName('podcast').item(0).setAttribute('title', title)
      doc.getElementsByTagName('podcast').item(0).setAttribute('uid', uid)
      doc.getElementsByTagName('photo').item(0).setAttribute('src', photoJpg)
      doc.getElementsByTagName('description').item(0).textContent = description
      doc.getElementsByTagName('interview').item(0).setAttribute('src', interviewFileName)
      doc.getElementsByTagName('introduction').item(0).setAttribute('src', interviewFileName)
      return serializer.serializeToString(doc);
    },

    async readUploadedFileAsText(inputFile) {
      const fr = new FileReader();
      return new Promise((resolve, reject) => {
        fr.onerror = () => {
          fr.abort();
          reject(new DOMException("Problem parsing input file."));
        };
        fr.onload = () => {
          resolve(fr.result);
        };
        fr.readAsArrayBuffer(inputFile);
      });
    },


    async buildZipFile(uid) {

      // todo we need to generate a manifest, i think?
      // todo go check the protocol/spec for the archive from the javafx code...

      const mapOfFileNamesToFiles = {
        'interview.mp3': this.files.interview,
        'introduction.mp3': this.files.introduction,
        'profile.jpg': this.files.photo
      }
      const zip = new JSZip();
      for (let fileKey in mapOfFileNamesToFiles) {
        let uploadedFile = mapOfFileNamesToFiles[fileKey];
        if (uploadedFile != null) {
          console.debug(`The user provided  ${fileKey} so were uploading that one.`)
          const data = await this.readUploadedFileAsText(uploadedFile);
          zip.file(fileKey, data, {base64: true})
        }
      }


      const xml = this.buildManifestXml(uid, this.title, this.description, this.files.introduction.name, this.files.interview.name, this.files.photo.name)
      zip.file('manifest.xml', xml)

      return await zip.generateAsync({type: 'blob'})

    },
    async createEpisode() {
      const uid = this.uuidV4()
      const zipFile = await this.buildZipFile(uid)
      const formData = new FormData()

      formData.append('file', zipFile)
      const response = await fetch('http://localhost:8080/test-upload/' + uid, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.$root.$data.session.token
        }
      })
      console.info(response, 'finished upload...')
    },
    async previewProfilePhoto() {
      const reader = new FileReader()
      reader.addEventListener('load', (theFile) => {
        this.backgroundImageUrl = `background-image: url("${theFile.target.result}")`
      })
      reader.readAsDataURL(this.files.photo)
    },
    uuidV4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
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
