<template>
  <form class="bookmark-row">
    <div class="form-row">
      <div class="col-6">
        <span class="bookmark-id">#{{ bookmark.bookmarkId }}</span>
        <img v-if="!bookmark.edited" class="warning-icon" src="/warning.png"/>
      </div>
      <div class="col-6">
        <span class="bookmark-time ">{{ _formatDate(bookmark.time) }}</span>
      </div>
    </div>
    <div class="form-row">
      <div class="col-12">

        <input :value="bookmark.href" class="form-control"
               placeholder="URL"
               type="url"
               @change="updateHref()">
      </div>
    </div>

    <div class="form-row">
      <div class="col-12">
                        <textarea v-model="bookmark.description"
                                  class="form-control" rows="5"
                                  @change="updateDescription()">
                        </textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="col-12">
        <input v-model="tags" class="form-control"/>
      </div>
    </div>

    <button :disabled="!dirty" class="btn btn-primary" type="submit" @click.prevent="onSaveButton">Save
    </button>
    <button class="btn " type="submit" @click.prevent="onOpenButton">Open</button>
    <button class="btn btn-danger" style="float: right" type="submit" @click.prevent="onDeleteButton">
      Delete
    </button>
  </form>
</template>
<script>
export default {

  name: 'Editor',
  props: ['bookmark'],
  mounted() {
  },
  created() {
    this.original = {};
    for (let k in this.bookmark) {
      this.original[k] = this.bookmark [k];
    }
  },
  computed: {
    date: {
      get() {
        return new Date(this.bookmark.date * 500);
      }
    },
    tags: {
      get() {
        return (this.bookmark.tags || []).join(this.divider);
      },
      set(newValue) {
        this.bookmark.tags = newValue.split(this.divider)
        this._markDirty()
      }
    }
  },
  methods: {
    onDeleteButton() {
      this.$emit('delete-bookmark', this.bookmark);
    },
    onOpenButton() {
      this.$emit('open-bookmark', this.bookmark);
    },
    onSaveButton() {
      this.$emit('save-bookmark', this.bookmark);
    },
    _formatDate(date) {
      const dateTimeFormat = new Intl.DateTimeFormat('en',
          {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})
      const result = dateTimeFormat.formatToParts(date)
      const [{value: month}, , {value: day}, , {value: year}, , {value: hour}, , {value: minute}] = result
      return `${month}/${day}/${year} @ ${hour}:${minute} `
    },
    _markDirty() {
      this.dirty = false;
      for (let k in this.original) {
        const ogValue = this.original[k];
        const newValue = this.bookmark[k];
        if (ogValue !== newValue) {
          this.dirty = true
        }
      }
    },
    updateHref() {
      this._markDirty()
    },
    updateDescription() {
      this._markDirty()
    }
  },
  data() {
    return {
      original: null,
      dirty: false,
      divider: ', '
    };
  }
}
</script>
<style scoped>

.warning-icon {
  width: 1em;
  height: auto;
  vertical-align: baseline;
}

.form-row {
  padding-bottom: .75em;
}

.bookmark-time {
  font-size: 90%;
  color: dodgerblue;
  float: right;
  vertical-align: bottom;
  font-weight: normal;
}

.bookmark-id {
  font-size: x-large;
  vertical-align: baseline;
  font-weight: bold;
  color: dodgerblue;
  margin-right: .5em;
}


.bookmark-row {
  box-sizing: content-box;
  /*box-sizing: border-box;*/
  /*border-bottom: 1px solid black;*/
  padding-top: 1em;
  padding-bottom: 1em;
}

</style>
