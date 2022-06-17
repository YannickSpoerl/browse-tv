<template>
  <q-card class="el-preview" dark flat>
    <q-img :alt="el.title + ' cover image'" loading="lazy" :src="el.image" />
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Item } from './models';

export default defineComponent({
  name: 'ListElement',
  props: {
    el: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props) {
    return { ...props.el };
  },
});
</script>
<style lang="scss">
.el-preview {
  width: 100%;
  max-width: 23%;
  min-width: 150px;
  max-height: 360px;
  margin: 10px;
  cursor: pointer;
  img {
    width: 100%;
  }
}
</style>
