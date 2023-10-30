<template>
  <nav>
    <v-app-bar fixed color="blue " dark dense>
      <v-app-bar-nav-icon @click="drawer = !drawer">jkl</v-app-bar-nav-icon>

      <router-link to="/songs" tag="v-toolbar-title" class="brand">
        <span class="font-weight-light">Tab</span>
        Tracker
      </router-link>

      <v-toolbar-items class="ml-2">
        <router-link tag="v-btn" flat class="blue elevation-0" to="/songs">Songs</router-link>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!$store.state.isSignedIn" class="ml-2">
        <router-link tag="v-btn" flat class="blue elevation-0" to="/login">Log in</router-link>
        <router-link tag="v-btn" flat class="blue elevation-0" to="/register">Sign in</router-link>
      </v-toolbar-items>
      <v-toolbar-items v-else class="ml-2">
        <v-btn text class="blue elevation-0" @click="logout">log out</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      height="100vh"
      v-model="drawer"
      dark
      class="blue accent-4"
      absolute
      temporary
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>add</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Dashboard", icon: "dashboard" },
        { title: "Account", icon: "account_box" },
        { title: "Admin", icon: "gavel" },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style scoped>
.brand {
  cursor: pointer;
}
.brand:hover {
  opacity: 0.8;
}
</style>