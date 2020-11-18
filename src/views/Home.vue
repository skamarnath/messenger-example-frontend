<template>
  <app-layout>
    <template v-slot:header-actions>
      <v-avatar color="indigo" size="36">
        <span class="white--text headline">{{
          loading ? ".." : user.nickname.slice(0, 2)
        }}</span>
      </v-avatar>
      <v-btn
        :loading="loading"
        :disabled="loading"
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
  </app-layout>
</template>

<script>
import AppLayout from "../components/AppLayout.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { AppLayout },
  computed: {
    ...mapState(["user", "loading"])
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    }
  },
  name: "Home"
};
</script>
