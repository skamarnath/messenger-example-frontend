<template>
  <form-layout>
    <template v-slot:header-text>SignUp Form</template>
    <v-container>
      <v-form ref="signupForm" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nickname"
          :rules="nameRules"
          autocomplete="nickname"
          label="Nick Name"
          couter
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passowrdRules"
          autocomplete="new-password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-text-field
          v-model="verifyPassword"
          autocomplete="new-password"
          :append-icon="showVerifyPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[
            ...passowrdRules,
            v => v === password || 'Passwords must match'
          ]"
          :type="showVerifyPassword ? 'text' : 'password'"
          label="Verify Password"
          counter
          @click:append="showVerifyPassword = !showVerifyPassword"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="handleSignUp"
        >
          SignUp
        </v-btn>
      </v-form>
    </v-container>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn depressed text @click="() => this.$router.push('/login')">
        Login
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
      nickname: "skamarnath",
      nameRules: [
        v => !!v || "Nick Name is required",
        v => (v && v.length > 6) || "Nick Name can't be less than 6 characters"
      ],
      password: "skamarnath",
      passowrdRules: [
        v => !!v || "Password is required",
        v => (v && v.length > 7) || "Password can't be less than 8 characters"
      ],
      showPassword: false,
      verifyPassword: "skamarnath",
      showVerifyPassword: false
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    async handleSignUp() {
      if (this.$refs.signupForm.validate()) {
        try {
          await this.signUp({
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
