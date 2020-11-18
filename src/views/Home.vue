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
      <v-sheet color="lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <span class="white--text headline">{{
            loading || !user ? ".." : user.nickname.slice(0, 2)
          }}</span></v-avatar
        >

        <div>{{ user && user.nickname }}</div>
      </v-sheet>
      <v-list shaped>
        <v-list-item-group value="currentFriend.id">
          <v-list-item v-for="friend in friends" :key="friend.id" link>
            <v-list-item-content @click="handleFriendChange(friend)">
              <v-list-item-title>{{ friend.nickname }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
    <div v-if="this.currentFriend == null">
      <v-container>Select a User to Chat</v-container>
    </div>
    <v-container v-else class="pa-0" :style="`position: absolute; bottom: 0`">
      <v-row class="align-self-end">
        <v-col>
          <div
            :class="
              `ma-6 d-flex ${
                message.toId == currentFriend.id ? 'flex-row-reverse' : ''
              }`
            "
            v-for="message in messages"
            :key="message.id"
          >
            <v-sheet outlined class="d-inline pa-2">
              {{ message.message }}
            </v-sheet>
          </div>
        </v-col>
      </v-row>
      <v-footer ref="messageInput">
        <v-textarea
          v-model="inputMessage"
          rows="1"
          auto-grow
          append-outer-icon="mdi-send"
          @click:append-outer="handleSendMessage"
        ></v-textarea>
      </v-footer>
    </v-container>
  </app-layout>
</template>

<script>
import AppLayout from "../components/AppLayout.vue";
import { mapActions, mapState } from "vuex";
import { io } from "socket.io-client";

let socket;

export default {
  data() {
    return {
      inputMessage: ""
    };
  },
  components: { AppLayout },
  computed: {
    ...mapState(["user", "loading", "friends", "currentFriend", "messages"])
  },
  methods: {
    ...mapActions(["logout", "loadFriends", "loadMessages", "addMessage"]),
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
    handleFriendChange(friend) {
      if (!this.currentFriend || this.currentFriend.id !== friend.id) {
        this.$router.push(`/home/${friend.nickname}`);
        this.loadMessages(friend);
      }
    },
    handleSendMessage() {
      this.sendMessage(this.currentFriend.id, this.inputMessage);
      this.inputMessage = "";
    },
    setupSocket() {
      socket = io(process.env.VUE_APP_API_BASE, {
        query: `token=${this.user.jwt}`
      });

      socket.on("receiveMessage", ({ from, message }) =>
        this.addMessage({
          from,
          message,
          to: this.user.to
        })
      );
    },
    sendMessage(to, message) {
      socket.emit("addMessage", { to, message });
      this.addMessage({
        from: this.user.id,
        to,
        message
      });
    }
  },
  async created() {
    await this.loadFriends();
    this.setupSocket();
    if (this.$route.params.nickname) {
      const currentFriend = this.friends.find(
        friend => friend.nickname == this.$route.params.nickname
      );
      this.loadMessages(currentFriend);
    }
  },
  name: "Home"
};
</script>
