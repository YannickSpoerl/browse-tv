<template>
  <div class="row justify-center" v-if="showBanner" style="margin-top: 25px">
    <LogoImg style="max-height: inherit" />
  </div>
  <AppDescription v-if="showDescription" />

  <div class="row justify-center">
    <p>
      2022 -
      <a href="https://yannickspoerl.de" target="_blank" class="text-accent"
        >Yannick Spoerl</a
      >
    </p>
  </div>
  <div class="row justify-center">
    <p>
      Built with
      <a href="https://quasar.dev" target="_blank" class="text-accent"
        >Quasar</a
      >
      and
      <a href="https://vuejs.org/" target="_blank" class="text-accent"
        >Vue.js</a
      >
    </p>
  </div>
  <div class="row justify-center">
    <p>
      Data provided by
      <a
        href="https://https://imdb-api.com/"
        target="_blank"
        class="text-accent"
        >IMDB</a
      >
    </p>
  </div>
  <div class="row justify-center">
    <p>
      Check out the code on
      <!-- TODO: repo link -->
      <a href="https://yannickspoerl.de" target="_blank" class="text-accent"
        >Github</a
      >
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AppDescription from './AppDescription.vue';
import LogoImg from './LogoImg.vue';

export default defineComponent({
  name: 'AboutSection',
  components: { AppDescription, LogoImg },
  props: {
    showBanner: {
      type: Boolean,
      required: false,
      default: true,
    },
    showDescription: {
      type: Boolean,
      required: false,
      default: true,
    },
    numberOfItems: {
      type: Number,
      required: false,
    },
  },
});
</script>
