<template>
  <v-app id="inspire">
    <v-app-bar app>
      <slot name="header-left"></slot>

      <v-toolbar-title>Messenger Example</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="header-right"></slot>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
