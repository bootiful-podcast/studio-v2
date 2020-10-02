<template>
    <form class="bookmark-row">
        <div class="form-row">
            <div class="col-6">
                <span class="bookmark-id">#{{bookmark.bookmarkId}}</span>
                <img src="/warning.png" class="warning-icon" v-if="!bookmark.edited"/>
            </div>
            <div class="col-6">
                <span class="bookmark-time ">{{ _formatDate(bookmark.time) }}</span>
            </div>
        </div>
        <div class="form-row">
            <div class="col-12">

                <input type="url" class="form-control"
                       :value="bookmark.href"
                       @change="updateHref()"
                       placeholder="URL">
            </div>
        </div>

        <div class="form-row">
            <div class="col-12">
                        <textarea @change="updateDescription()"
                                  rows="5" class="form-control"
                                  v-model="bookmark.description">
                        </textarea>
            </div>
        </div>

        <div class="form-row">
            <div class="col-12">
                <input class="form-control" v-model="tags"/>
            </div>
        </div>

        <button type="submit" @click.prevent="onSaveButton" class="btn btn-primary" :disabled="!dirty">Save
        </button>
        <button type="submit" @click.prevent="onOpenButton" class="btn ">Open</button>
        <button type="submit" style="float: right" @click.prevent="onDeleteButton" class="btn btn-danger">
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
        box-sizing: content-box  ;
        /*box-sizing: border-box;*/
        /*border-bottom: 1px solid black;*/
        padding-top: 1em;
        padding-bottom: 1em;
    }

</style>
