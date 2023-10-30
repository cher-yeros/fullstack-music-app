<template>
  <v-container>
    <v-col justify="center" align="center" height="00px">
      <v-flex xs12 sm8 md6 class="mx-2 white elevation-2">
        <v-toolbar dense dark flat color="blue">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-form m-3 p-3 class="mx-5 px-4" aria-autocomplete="off">
          <v-alert width="400px" class="my-1 error white--text" v-show="error" v-text="error"></v-alert>
          <v-text-field
            v-model="info.email"
            :rules="emailRules"
            label="E-mail"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="info.password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn class="blue my-2" dark @click="login">Login</v-btn>
          <br />
        </v-form>
      </v-flex>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      endpoint: "http://localhost:5000/login",
      info: {
        email: "",
        password: "",
      },
      error: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    login() {
      axios
        .post(this.endpoint, this.info)
        .then(({ data }) => {
          if (data.success) {
            this.$router.push({ name: "songs" });
            this.$store.dispatch("setUser", data.user);
          }
        })
        .catch((error) => {
          console.log(error);
          // this.error = error.data.error;
        });
    },
  },
};
</script>

<style scoped></style>
