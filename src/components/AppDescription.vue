<template>{{ appDescription }}</template>
<script>
import { defineComponent } from 'vue';
import appConfig from 'src/appConfig';

export default defineComponent({
  name: 'AppDescription',
  setup() {
    const appDescription = appConfig.appDescription;

    return {
      appDescription,
    };
  },
});
</script>
