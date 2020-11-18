<template>
  <app-layout>
    <template v-slot:header-actions>
      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        icon
        @click="handleLogout"
      >
        <v-icon dark>
          mdi-logout
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:nav>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <span class="white--text headline">{{
            loading || !user ? ".." : user.nickname.slice(0, 2)
          }}</span></v-avatar
        >

        <div>{{ user && user.nickname }}</div>
      </v-sheet>
      <v-list shaped>
        <v-list-item v-for="friend in friends" :key="friend.id" link>
          <v-list-item-content
            @click="() => $router.push(`/home/${friend.nickname}`)"
          >
            <v-list-item-title>{{ friend.nickname }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
    <div v-if="$route.params.nickname == null">Select a User to Chat</div>
  </app-layout>
</template>

<script>
import AppLayout from "../components/AppLayout.vue";
import { mapActions, mapState } from "vuex";
import { io } from "socket.io-client";

export default {
  components: { AppLayout },
  computed: {
    ...mapState(["user", "loading", "friends"])
  },
  methods: {
    ...mapActions(["logout", "loadFriends"]),
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
    handleSocket() {
      const socket = io(process.env.VUE_APP_API_BASE, {
        query: `token=${this.user.jwt}`
      });
    }
  },
  created() {
    this.loadFriends();
    this.handleSocket();
  },
  name: "Home"
};
</script>
