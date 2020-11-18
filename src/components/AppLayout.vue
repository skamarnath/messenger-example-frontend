<template>
  <base-layout>
    <template v-slot:header-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <template v-slot:header-right>
      <slot name="header-actions"></slot>
    </template>
    <v-navigation-drawer v-model="drawer" app>
      <slot name="nav"></slot>
    </v-navigation-drawer>
    <v-container>
      <slot></slot>
    </v-container>
  </base-layout>
</template>

<script>
import BaseLayout from "./BaseLayout.vue";

export default {
  data: () => ({ drawer: null }),
  components: {
    BaseLayout
  }
};
</script>
