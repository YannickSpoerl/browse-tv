<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="appHeader">
      <q-toolbar
        style="max-height: 56px; padding-right: 0"
        class="row justify-between"
      >
        <div class="col-3 header-el row gt-sm">
          <q-space />
          <LogoImg class="header-el" />
          <q-space />
        </div>
        <LogoImg class="lt-md header-el" />
        <q-space class="lt-md" />
        <q-btn-toggle
          class="gt-sm"
          v-model="currentType"
          flat
          dark
          stretch
          :options="typeOptions"
          @update:model-value="updateFilteredItems"
          toggle-color="accent"
          :ripple="false"
        />
        <q-input
          v-model="currentSearchphrase"
          class="gt-sm"
          label="Search for movies, TV-shows, actors,..."
          dark
          dense
          color="accent"
          style="width: 20%; margin: 0 40px 0; min-width: 150px"
          @update:model-value="updateFilteredItems"
          debounce="1000"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-select
          dark
          class="gt-sm"
          clearable
          dense
          v-model="currentGenre"
          :options="genreOptions"
          @update:model-value="updateFilteredItems"
          label="Select genre"
          color="accent"
          style="width: 10%"
        />
        <q-space />
        <q-btn
          stretch
          flat
          class="gt-sm"
          label="About"
          @click="aboutDialogOpen = true"
        />

        <q-btn
          aria-label="Open drawer menu"
          flat
          stretch
          dark
          style="width: 56px"
          class="lt-md"
          @click="drawerOpen = !drawerOpen"
          dense
        >
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
      <q-drawer v-model="drawerOpen" overlay>
        <q-list
          style="width: inherit; height: 100%"
          class="column justify-between"
        >
          <div class="col">
            <q-item class="row justify-center">
              <LogoImg style="width: 90%" />
            </q-item>
            <AppDescription />
            <q-item class="row justify-center" style="margin-top: 20px">
              <q-input
                v-model="currentSearchphrase"
                label="Search for movies, TV-shows, actors,..."
                dark
                dense
                color="accent"
                style="width: 80%"
                @update:model-value="updateFilteredItems"
                debounce="1000"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-item>
            <q-item class="row justify-center" style="margin-top: 20px">
              <q-btn-toggle
                v-model="currentType"
                flat
                dark
                stretch
                :options="typeOptions"
                @update:model-value="updateFilteredItems"
                toggle-color="accent"
                :ripple="false"
                style="width: 80%"
              />
            </q-item>
            <q-item class="row justify-center" style="margin-top: 20px">
              <q-select
                dark
                clearable
                dense
                v-model="currentGenre"
                :options="genreOptions"
                @update:model-value="updateFilteredItems"
                label="Select genre"
                color="accent"
                style="width: 80%"
              />
            </q-item>
          </div>
          <AboutSection
            :show-banner="false"
            :show-description="false" /></q-list
      ></q-drawer>
    </q-header>
    <q-dialog v-model="aboutDialogOpen">
      <q-card id="aboutDialogCard" dark>
        <AboutSection />
      </q-card>
    </q-dialog>
    <q-page-container>
      <ItemList :items="filteredItems" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { staticJsonItemService } from 'src/services';
import { ItemType } from 'components/models';
import ItemList from 'components/ItemList.vue';
import AboutSection from '../components/AboutSection.vue';
import AppDescription from '../components/AppDescription.vue';
import LogoImg from 'src/components/LogoImg.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    ItemList,
    AboutSection,
    AppDescription,
    LogoImg,
  },
  setup() {
    const drawerOpen = ref(false);
    const aboutDialogOpen = ref(false);

    const genreOptions = ref(staticJsonItemService.getAllGenres());
    const typeOptions = ref([
      { label: 'All', value: ItemType.UNSPECIFIED },
      { label: 'Movies', value: ItemType.MOVIE },
      { label: 'TV-shows', value: ItemType.SERIES },
    ]);

    const currentGenre = ref('');
    const currentType = ref(typeOptions.value[0].value);
    const currentSearchphrase = ref('');

    const filteredItems = ref(staticJsonItemService.getAllItems());

    async function updateFilteredItems() {
      filteredItems.value =
        staticJsonItemService.getItemsByGenreTypeAndSearchphrase(
          currentGenre.value,
          currentType.value,
          currentSearchphrase.value
        );

      drawerOpen.value = false;
    }

    return {
      drawerOpen,
      aboutDialogOpen,
      genreOptions,
      typeOptions,
      currentGenre,
      currentType,
      currentSearchphrase,
      filteredItems,
      updateFilteredItems,
    };
  },
});
</script>
<style lang="scss">
#aboutDialogCard {
  width: 100%;
  height: 45%;
  font-size: 18px;
}

.appHeader {
  border-bottom: 1px solid #424246;
  font-size: 1rem;
}

.header-el {
  max-height: inherit;
}
</style>
