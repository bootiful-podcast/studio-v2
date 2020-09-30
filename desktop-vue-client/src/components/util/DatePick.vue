<template>
    <input type="date"
           ref="datePicker"
           @change="handleValueChange"
           :value="dateString"
           @input="updateDate()"/>
</template>

<script>

    /*
    * This blog post shows how you can initialize the component on the first load with parent properties
    * and then trigger a re-evaluation when things in the parent change using the watcher capability.
    *
    * https://forum.vuejs.org/t/data-properties-based-on-props-are-not-re-evaluated-when-props-change/21085/4
    */
  export default {
    name: 'DatePick',
    props: ['value'],
    data() {
      return {
        dateString: this.initializeDateString()
      };
    },
    watch: {
      // whenever the property called 'value' is changed externally,
      // we want to refresh our view of that property
      value: function (/* newValue*/) {
        this.initializeDateString()
      }
    },
    created() {
      this.initializeDateString()
    },
    methods: {

      initializeDateString() {
        function lpad(stringToPad) {
          if (typeof stringToPad === 'number') {
            stringToPad = `${stringToPad}`
          }
          if (stringToPad.length === 1) {
            return `0${stringToPad}`
          }
          return stringToPad
        }

        if (this.value == null) {
          this.handleValueChange()
        } else {
          this.dateString = (this.value.getFullYear() + '-' + lpad(this.value.getMonth() + 1) + '-' + lpad(this.value.getDate()))
        }
      },
      handleValueChange() {
        if (this.value === null) {
          this.dateString = ''
          const datePicker = this.$refs.datePicker
          if (datePicker) {
            datePicker.value = ''
          }
        }
      },
      updateDate() {
        const value = this.$refs.datePicker.value
        if (value == null) return
        const [y, m, d] = value.split('-')
        const dateValue = new Date(y, m - 1, d, 0, 0, 0, 0)
        this.$emit('change', dateValue)
        this.$emit('input', dateValue)
      }
    }
  };
</script>