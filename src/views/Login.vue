<template>
  <form-layout>
    <template v-slot:header-text>Login Form</template>
    <v-container>
      <v-form ref="loginForm" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nickname"
          autocomplete="nickname"
          :rules="nameRules"
          label="Nick Name"
          couter
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          autocomplete="current-password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passowrdRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="handleLogin"
        >
          Login
        </v-btn>
      </v-form>
    </v-container>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn depressed text @click="() => this.$router.push('/signup')">
        Sign Up
      </v-btn>
    </v-card-actions>
  </form-layout>
</template>
<script>
import FormLayout from "../components/FormLayout.vue";
import { mapActions } from "vuex";

export default {
  data: () => {
    return {
      valid: true,
      nickname: "",
      nameRules: [
        v => !!v || "Nick Name is required",
        v => (v && v.length > 6) || "Nick Name can't be less than 6 characters"
      ],
      password: "",
      passowrdRules: [
        v => !!v || "Password is required",
        v => (v && v.length > 7) || "Password can't be less than 8 characters"
      ],
      showPassword: false
    };
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      if (this.$refs.loginForm.validate()) {
        try {
          await this.login({
            nickname: this.nickname,
            password: this.password
          });
          this.$router.push("/");
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  components: {
    FormLayout
  }
};
</script>
