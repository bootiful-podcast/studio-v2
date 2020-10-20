<style>


.files-form {
  display: grid;
  grid-template-areas: "audio photo";
  grid-template-rows:  auto;
  grid-template-columns: auto 300px;
}

.audio-files {
  margin-right: var(--panel__margin);
  grid-area: audio;
}


.profile-photo-file {
  grid-area: photo;
  display: grid;
}

.disabled {
  color: var(--clr-gray-darker);
  cursor: text;
}


.profile-photo-file--upload-preview {
  margin-top: calc(var(--panel__margin) / 2);
  width: 300px;
  height: auto;
  min-height: 300px;
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
          <b-form-input id="title" :state="! isEmptyString(this.title)" v-model="title" class="form-control"
                        placeholder="Enter the title for the new episode"></b-form-input>
        </div>
        <div class="form-group">
          <label class="panel__prompt" for="description">
            Description
          </label>
          <b-form-textarea
              id="description" :state=" !isEmptyString(this.description)"
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
                           accept=".mp3"
                           :state="!isEmptyFile ( this.files.introduction)"
                           v-model="files.introduction"
                           class="  introduction-upload upload-drop-zone-audio">

              </b-form-file>

            </div>

            <div class="form-group">
              <label class="panel__prompt" for="interview">
                Interview Audio <span class="file-type">(.MP3)</span>
              </label>
              <b-form-file id="interview"
                           v-model="files.interview"
                           accept=".mp3"
                           :state="!isEmptyFile ( this.files.interview)"
                           class="introduction-upload upload-drop-zone-audio"></b-form-file>
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
                    :state="!isEmptyFile ( this.files.photo)"
                />
              </div>
            </div>
          </div>
          <div class="profile-photo-file">
            <div class="form-group">
              <div class="profile-photo-file--upload-preview upload-drop-zone" v-bind:style="backgroundImageUrl"></div>
            </div>
          </div>
        </div>

        <div class="buttons">
          <a class=" action action__alternative   " href=""
             @click.prevent="cancelForm">Cancel</a>
          <a :class="'action action__main ' + ( this.formIsValid ? '' : 'disabled' ) " href=""
             @click.prevent="createEpisode">Create</a>
        </div>
      </form>
    </Panel>

    <b-modal ref="form-modal" hide-footer title="Publishing Episode...">
      <div class="d-block text-center">
        <p> {{ publicationStatusMessage }} </p>
      </div>
      <div class="buttons" v-if="published">
        <a :class="'action__main ' + ( this.published ? '' : 'disabled' ) " href=""
           @click.prevent="episodeHasBeenProducedCallback">OK</a>
      </div>
    </b-modal>

  </Page>


</template>
<script>
import Page from "@/components/Page";
import Panel from "@/components/Panel";
import Tip from "@/components/Tip";
import readFileReaderData from "@/FileReaderUtils";


const messages = {
  'uploading': `Uploading audio files...`,
  'processing' : `Processing audio files...`,
  'audio-complete': `The audio files have been processed and an output podcast successfully  produced`,
  'audio-upload-complete': `The audio files have been uploaded successfully`,
  'podbean-complete': `The podcast has been published to Podbean.com`
}


export default {
  name: 'CreateEpisodePage',
  mounted() {
    console.log('component mounted.')
    this.cancelForm()
  },
  created() {
    console.debug('starting ' + this.$options.name)

  },
  methods: {
    episodeHasBeenProducedCallback() {
      this.cancelForm()
      this.$router.push('/search')
    },
    cancelForm() {
      this.title = null
      this.description = null
      this.files.photo = null
      this.files.interview = null
      this.backgroundImageUrl = null
      this.files.introduction = null
      this.published = false
      this.publicationStatusMessage = messages ['uploading']

    },
    async createEpisode() {
      if (this.formIsValid === true) {
        await this.$root.$data.createEpisode(this.title, this.description, this.files.introduction,
            this.files.interview, this.files.photo, async (productionStatus) => {
              console.log('production status:', productionStatus)
              console.log('attempting to resolve status ', productionStatus.status, 'to a local message', messages [productionStatus.status])
              this.publicationStatusMessage = messages [productionStatus.status]
              this.published = productionStatus.finished
              this.$refs['form-modal'].show()
            })
      }

    },
    async previewProfilePhoto() {
      if (this.files.photo == null) {
        return
      }
      const theFile = await readFileReaderData(this.files.photo, (fr) => {
        return fr.readAsDataURL
      });
      if (theFile !== null) {
        this.backgroundImageUrl = `background-image: url("${theFile}")`
      }
    },
    isEmptyFile(f) {
      return f == null
    },
    isEmptyString(s) {
      return s == null || s.trim() === ''
    }
  },
  computed: {
    formIsValid: function () {
      const files = [this.files.introduction, this.files.interview, this.files.photo]
      const text = [this.title, this.description]
      const valid = files.filter(f => this.isEmptyFile(f)).length === 0 && text.filter(t => this.isEmptyString(t)).length === 0
      console.log('valid', valid)
      return valid
    }
  },
  data() {
    return {
      publicationStatusMessage: '',
      published: false,
      originalBackgroundImageUrl: null,
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
