<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="gt-sm">
      <q-toolbar class="header-el row justify-between">
        <slot name="desktop-toolbar"></slot>
      </q-toolbar>
    </q-header>

    <q-header class="lt-md">
      <q-toolbar class="header-el justify-between">
        <q-space />
        <LogoImg class="header-el" style="margin-left: 56px" />
        <q-space />
        <q-btn
          aria-label="Open drawer menu"
          flat
          stretch
          dark
          style="width: 56px"
          @click="openDrawer"
          dense
        >
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" class="text-secondary" overlay>
      <div
        class="column justify-between"
        style="height: 100%; width: 80%; margin: auto"
      >
        <slot name="mobile-drawer"></slot>
      </div>
    </q-drawer>

    <q-page-container>
      <slot name="content"></slot>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LogoImg from 'src/components/LogoImg.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    LogoImg,
  },
  setup() {
    const drawerOpen = ref(false);

    function closeDrawer(): void {
      drawerOpen.value = false;
    }

    function openDrawer(): void {
      drawerOpen.value = true;
    }

    return {
      drawerOpen,
      closeDrawer,
      openDrawer,
    };
  },
});
</script>
<style lang="scss"></style>
