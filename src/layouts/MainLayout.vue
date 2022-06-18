<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="gt-sm">
      <q-toolbar class="header-el row justify-between">
        <div class="col-3 header-el row">
          <q-space />
          <LogoImg class="header-el" />
          <q-space />
        </div>
        <slot name="desktop-toolbar"> </slot>
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
      <slot name="mobile-drawer"></slot>
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
  emits: ['openMobileDrawer'],
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
