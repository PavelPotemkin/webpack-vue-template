<template>
  <the-header />

  <main>
    <router-view />
  </main>
  
  <the-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/vue/layouts/TheHeader.vue'
import TheFooter from "@/vue/layouts/TheFooter.vue";

export default defineComponent({
  name: 'App',
  components: {TheFooter, TheHeader}
})
</script>
