<template>
  <header>
    <nav>
      <router-link to="/">
        Main
      </router-link>
      
      <router-link to="/about">
        About
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheHeader',
})
</script>
