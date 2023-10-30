<template>
  <v-container>
    <v-col align="center" justify="center">
      <v-flex xs12 md8 class="white elevation-0">
        <v-text-field
          width="300px"
          class="search"
          v-model="search"
          label="Search song by title, artist,album or genre"
          type="search"
          @keyup="handleSearch"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md8 class="white elevation-2">
        <v-toolbar class="blue" dense dark>
          <v-toolbar-title>Songs</v-toolbar-title>
          <!-- <v-toolbar-items> -->
          <router-link fab tag="v-btn" to="/songs/add" outline flat class="ml-4 blue">Add new Song</router-link>
          <!-- </v-toolbar-items> -->
          <v-spacer></v-spacer>
          <v-toolbar-items></v-toolbar-items>
        </v-toolbar>
        <v-container>
          <template v-for="song in songs">
            <v-row
              align="center"
              justify="center"
              :key="song.id"
              class="white elevation-2 my-2 mx-2"
            >
              <v-flex md4>
                <v-card class="white elevation-0 my-2">
                  <v-card class="white elevation-0 my-2">{{song.title}}</v-card>
                  <v-card class="white elevation-0 my-2">{{song.artist}}</v-card>
                  <router-link
                    tag="v-btn"
                    :to="`/songs/show/`+song.id"
                    class="blue white--text"
                  >View</router-link>
                </v-card>
              </v-flex>
              <!-- <v-flex md3></v-flex>
              <v-flex md3></v-flex>-->
              <v-flex md5>
                <v-card class="white elevation-0 my-2">
                  <img class="album-art" src="albumArt.jpg" alt="Album Art" />
                </v-card>
              </v-flex>
            </v-row>
          </template>
        </v-container>
        <v-layout v-show="!songs" class="white elevation-2">No songs found!</v-layout>
      </v-flex>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
import _ from "lodash";
export default {
  data() {
    return {
      songs: [],
      search: "",
    };
  },
  created() {
    const q = this.$router.history.current.query.q;
    if (q) this.search = q;
    this.getSongs();
  },
  methods: {
    getSongs() {
      axios
        .get("http://localhost:5000/songs")
        .then((res) => {
          this.songs = res.data;
        })
        .catch((err) => console.log("Error", err));
    },
    handleSearch() {},
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "songs",
      };

      if (this.search != "")
        route.query = {
          q: value,
        };
      // this.$router.push(route);
      console.log("Searching...", value);

      axios
        .get("http://localhost:5000/songs?q=" + value)
        .then((res) => {
          this.songs = res.data;
        })
        .catch((err) => console.log("Error", err));
    }, 500),
    // "$route.query.search": {
    //   immediate: true,
    //   handler(value) {
    //     this.search = value;
    //   },
    // },
  },
};
</script>

<style scoped>
.album-art {
  width: 200px;
}
</style>
