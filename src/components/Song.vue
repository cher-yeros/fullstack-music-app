<template>
  <v-container>
    <v-row v-if="song" justify="center" class="white elevation-2" align="center">
      <v-flex md4>
        <v-card class="white elevation-0 my-2">
          <v-card class="white elevation-0 my-2">{{song.title}}</v-card>
          <v-card class="white elevation-0 my-2">{{song.artist}}</v-card>
          <v-card class="white elevation-0 my-2">{{song.album}}</v-card>
          <router-link tag="v-btn" :to="`/songs`" class="blue white--text">Back to Songs</router-link>
          <br />
          <router-link tag="v-btn" :to="`/songs/edit/`+song.id" class="blue white--text my-2">Edit</router-link>
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
    <v-flex v-if="empty" xs12 sm8 md8>
      <v-card class="white elevation-0 my-2">This Song is not found</v-card>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      endpoint: "http://localhost:5000/songs/",
      song: null,
      empty: false,
    };
  },
  created() {
    const route = this.$router.history.current;
    axios.get(this.endpoint + route.params.id).then(({ data }) => {
      if (data) this.song = data;
      else this.empty = true;
    });
  },
};
</script>

<style scoped>
.search {
}
.album-art {
  width: 200px;
}
</style>

