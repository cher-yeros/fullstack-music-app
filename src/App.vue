<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>
          <app-bar></app-bar>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from "./components/AppBar.vue";

// import RouterView from "vue-router";
export default {
  name: "App",
  components: {
    AppBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
