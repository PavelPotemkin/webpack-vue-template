<template>
  <div>
    main page
    
    <Counter/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import Counter from "@/vue/views/Counter.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {Counter},
  setup() {
    onMounted(() => {
      console.log('mounted')
    })
  }
})
</script>

