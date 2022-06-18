<template>
  <q-btn-toggle
    class="col-auto"
    :model-value="type"
    flat
    dark
    stretch
    :options="typeOptions"
    @update:model-value="updateType"
    toggle-color="accent"
    :ripple="false"
  />
  <q-input
    class="col-auto"
    style="min-width: 250px; margin-top: 6px"
    :model-value="searchphrase"
    :label="searchFieldPlaceholder"
    dark
    dense
    color="accent"
    @update:model-value="updateSearchphrase"
    debounce="1000"
    clearable
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
  <q-select
    class="col-auto"
    dark
    style="min-width: 150px; margin-top: 6px"
    clearable
    dense
    :model-value="genre"
    :options="genreOptions"
    @update:model-value="updateGenre"
    :label="genreSelectPlaceholder"
    color="accent"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ItemType } from './models';
import appConfig from 'src/appConfig';
import { staticJsonItemService } from 'src/services';

export default defineComponent({
  name: 'FilterElements',
  emits: ['update:type', 'update:searchphrase', 'update:genre', 'update'],
  props: {
    type: {
      type: String,
      required: true,
    },
    searchphrase: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const searchFieldPlaceholder = appConfig.defaults.searchfieldPlaceholder;
    const genreSelectPlaceholder = appConfig.defaults.genreSelectPlaceholder;

    const typeOptions = ref([
      { label: 'All', value: ItemType.UNSPECIFIED },
      { label: 'Movies', value: ItemType.MOVIE },
      { label: 'TV-shows', value: ItemType.SERIES },
    ]);
    const genreOptions = ref(staticJsonItemService.getAllGenres());

    function updateType(newType: string | number | null): void {
      emit('update:type', newType);
      notifyUpdate();
    }

    function updateSearchphrase(newSearchphrase: string | number | null): void {
      const emitVal = newSearchphrase ? newSearchphrase : '';
      emit('update:searchphrase', emitVal);
      notifyUpdate();
    }

    function updateGenre(newGenre: string | number | null): void {
      const emitVal = newGenre ? newGenre : '';
      emit('update:genre', emitVal);
      notifyUpdate();
    }

    function notifyUpdate(): void {
      emit('update');
    }

    return {
      searchFieldPlaceholder,
      genreSelectPlaceholder,
      typeOptions,
      genreOptions,
      updateType,
      updateSearchphrase,
      updateGenre,
    };
  },
});
</script>
