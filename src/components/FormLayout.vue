<template>
  <base-layout>
    <template>
      <v-container>
        <v-card class="mx-auto" max-width="400" min-width="40vw" outlined>
          <v-container>
            <v-card-title align-center
              ><slot name="header-text">Form</slot></v-card-title
            >
            <slot></slot>
          </v-container>
        </v-card>
      </v-container>
    </template>
  </base-layout>
</template>
<script>
import BaseLayout from "../components/BaseLayout";

export default {
  components: {
    BaseLayout
  }
};
</script>
