<template>
  <div>
    about page
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue'

export default defineComponent({
  name: 'AboutPage',
  setup() {
    onMounted(() => {
      console.log('mounted')
    })
  }
})
</script>
