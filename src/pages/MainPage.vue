<template>
  <MainLayout ref="mainLayoutComponent">
    <template v-slot:desktop-toolbar>
      <div class="col row header-el">
        <div class="col-3 row justify-evenly header-el">
          <LogoImg />
        </div>
        <div style="max-width: 1000px" class="col row justify-evenly">
          <FilterElements
            v-model:type="currentType"
            v-model:searchphrase="currentSearchphrase"
            v-model:genre="currentGenre"
            @update="updateFilteredItems"
          />
        </div>
      </div>
      <q-btn
        class="col-auto"
        stretch
        flat
        label="About"
        @click="aboutDialogOpen = true"
      />

      <q-dialog v-model="aboutDialogOpen">
        <q-card id="aboutDialogCard" dark>
          <AboutSection />
        </q-card>
      </q-dialog>
    </template>

    <template v-slot:mobile-drawer>
      <div class="col" style="width: 100%">
        <LogoImg style="width: inherit" class="default-margin-top" />
        <div class="text-center default-margin-top">
          <AppDescription />
        </div>
        <div
          class="default-margin-top column justify-between"
          style="height: 30%"
        >
          <FilterElements
            v-model:type="currentType"
            v-model:searchphrase="currentSearchphrase"
            v-model:genre="currentGenre"
            @update="updateFilteredItems"
          />
        </div>
      </div>
      <div class="col-auto">
        <AboutSection :show-banner="false" :show-description="false" />
      </div>
    </template>

    <template v-slot:content>
      <ItemList :items="filteredItems" ref="itemListComponent" />
    </template>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { staticJsonItemService } from 'src/services';
import { ItemType } from 'components/models';
import ItemList from 'components/ItemList.vue';
import AboutSection from '../components/AboutSection.vue';
import MainLayout from 'src/layouts/MainLayout.vue';
import FilterElements from 'src/components/FilterElements.vue';
import LogoImg from 'src/components/LogoImg.vue';
import AppDescription from 'src/components/AppDescription.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    ItemList,
    AboutSection,
    MainLayout,
    FilterElements,
    LogoImg,
    AppDescription,
  },
  setup() {
    const itemListComponent = ref<InstanceType<typeof ItemList> | null>(null);
    const mainLayoutComponent = ref<InstanceType<typeof MainLayout> | null>(
      null
    );

    const aboutDialogOpen = ref(false);

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

      itemListComponent.value?.onItemListChange();
      mainLayoutComponent.value?.closeDrawer();
      console.log('here=');
    }

    return {
      aboutDialogOpen,
      typeOptions,
      currentGenre,
      currentType,
      currentSearchphrase,
      filteredItems,
      updateFilteredItems,
      itemListComponent,
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
.drawer-el {
  width: 90%;
}
</style>
