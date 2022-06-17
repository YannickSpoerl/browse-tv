<template>
  <div class="text-center" style="margin: 20px">
    <p class="text-subtitle1 text-secondary">
      {{
        items.length == 0
          ? 'Found no items.'
          : items.length == 1
          ? 'Found 1 item.'
          : 'Found ' + items.length + ' items.'
      }}
    </p>
  </div>
  <q-dialog v-model="detailDialogOpen">
    <DetailCard :el="selectedItem"
  /></q-dialog>
  <q-page class="row justify-center">
    <ListElement
      v-for="item in items.slice(0, maxResults)"
      :key="item.id"
      :el="item"
      @click="toggleItem(item)"
    />
    <div
      style="width: 100%; margin: 20px"
      class="text-center"
      v-if="maxResults < items.length"
    >
      <q-btn
        @click="maxResults = maxResults + resultsExtension"
        dark
        unelevated
        size="lg"
        outline
        color="secondary"
        label="Load more"
      />
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[25, 25]"
    >
      <q-btn
        fab
        icon="arrow_upward"
        aria-label="Back to the top"
        color="accent"
      />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import ListElement from 'components/ListElement.vue';
import { defineComponent, ref, PropType } from 'vue';
import { Item } from 'components/models';
import DetailCard from '../components/DetailCard.vue';
import appConfig from 'src/appConfig';

export default defineComponent({
  name: 'ItemList',
  components: { ListElement, DetailCard },
  props: {
    items: {
      type: Object as PropType<Item[]>,
      required: true,
    },
  },
  setup(props) {
    const maxResults = ref(appConfig.defaults.itemsVisible);
    const resultsExtension = ref(appConfig.defaults.itemsLoadMore);

    const detailDialogOpen = ref(false);
    const selectedItem = ref({} as Item);

    function onItemListChange(): void {
      selectedItem.value = {} as Item;
      detailDialogOpen.value = false;
      maxResults.value = resultsExtension.value;
      window.scrollTo(0, 0);
    }

    function toggleItem(item: Item): void {
      detailDialogOpen.value = true;
      selectedItem.value = item;
    }

    return {
      ...props.items,
      toggleItem,
      maxResults,
      resultsExtension,
      detailDialogOpen,
      selectedItem,
      onItemListChange,
    };
  },
});
</script>
