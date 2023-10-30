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
          <v-toolbar-title>Song Lyrics</v-toolbar-title>
          <!-- <v-toolbar-items> -->
          <router-link fab tag="v-btn" to="/lyrics/add" outline flat class="ml-4 blue">Add new Lyric</router-link>
          <!-- </v-toolbar-items> -->
          <v-spacer></v-spacer>
          <v-toolbar-items></v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row align="center" justify="center">
            <v-expansion-panels
              v-for="lyric in lyrics"
              :key="lyric.id"
              class="white elevation-2 my-2 mx-2"
            >
              <v-expansion-panel class="blue white--text display-1">
                <v-btn @click.prevent="show(lyric.id)" dark class="title" text>{{lyric.title}}</v-btn>
              </v-expansion-panel>
              <!-- <v-expansion-content>{{lyric.lyric}}</v-expansion-content> -->
              <v-card
                v-show="showLyric[lyric.id]"
                class="lyric elevation-0 my-1"
                v-html="lyric.lyric"
              ></v-card>
            </v-expansion-panels>
          </v-row>
        </v-container>
        <v-layout v-show="!lyrics" class="white elevation-2">No lyrics found!</v-layout>
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
      lyrics: [],
      search: "",
      showLyric: [],
    };
  },
  created() {
    const q = this.$router.history.current.query.q;
    if (q) this.search = q;
    this.getLyrics();
  },
  methods: {
    show(id) {
      console.log(id, !this.showLyric[id]);

      //   this.initShow(this.lyrics.length);
      this.showLyric[id] = !this.showLyric[id];
    },
    getLyrics() {
      axios
        .get("http://localhost:5000/lyrics")
        .then(({ data }) => {
          this.initShow(data.lyrics.length);

          this.lyrics = data.lyrics;
          //   console.log(res);
        })
        .catch((err) => console.log("Error", err));
    },
    handleSearch() {},
    initShow(len) {
      for (let i = 0; i < len; i++) {
        this.showLyric[i] = false;
      }
    },
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "lyrics",
      };

      if (this.search != "")
        route.query = {
          q: value,
        };
      // this.$router.push(route);
      console.log("Searching...", value);

      axios
        .get("http://localhost:5000/lyrics?q=" + value)
        .then((res) => {
          this.lyrics = res.data;
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
.lyric {
  font-family: "Ethiopic Addis";
}
.title {
  cursor: pointer;
}
</style>
