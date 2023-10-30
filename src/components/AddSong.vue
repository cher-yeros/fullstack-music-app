<template>
  <v-container>
    <v-row justify="center" height="00px">
      <v-flex xs12 sm8 md5 class="mx-2 my-2 white elevation-2">
        <v-toolbar dense dark flat color="blue small">
          <v-toolbar-title>Add Song</v-toolbar-title>
        </v-toolbar>
        <v-form ref="songForm" m-3 p-3 class="mx-5 px-4">
          <v-text-field
            v-model="song.title"
            :rules="rules.title"
            label="Song title"
            type="text"
            required
            class="mt-2"
          ></v-text-field>
          <v-text-field
            v-model="song.album"
            :rules="rules.album"
            label="Song Album"
            type="text"
            required
            class="mt-2"
          ></v-text-field>
          <v-text-field
            v-model="song.artist"
            :rules="rules.artist"
            label="Song Artist"
            type="text"
            required
            class="mt-2"
          ></v-text-field>
          <v-text-field
            v-model="song.genre"
            :rules="rules.genre"
            label="Song Genre"
            type="text"
            required
            class="mt-2"
          ></v-text-field>
          <v-text-field
            v-model="songFile"
            :rules="rules.songFile"
            label="Song File"
            type="file"
            required
            class="mt-2"
          ></v-text-field>

          <v-btn class="blue my-3" dark @click="addSong" v-text="btnName"></v-btn>
          <!-- <br /> -->
        </v-form>
      </v-flex>
      <v-flex xs12 sm8 md5 class="mx-2 my-2 white elevation-2">
        <v-toolbar dense dark flat color="blue small">
          <v-toolbar-title>Add Lyrics</v-toolbar-title>
        </v-toolbar>

        <v-textarea label="Song Lyrics" class="mx-5 px-4"></v-textarea>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      song: {
        title: "የኔ እረኛ",
        album: "ሐብተ ሰማይ",
        artist: "ሃና ተክሌ",
        genre: "Gospel",
      },
      rules: {
        title: [(v) => !!v || "Title is required"],
        album: [(v) => !!v || "Album is required"],
        artist: [(v) => !!v || "Artist is required"],
        genre: [(v) => !!v || "Genre is required"],
        songFile: [(v) => !!v || "Songfile is required"],
      },
      songFile: "",
      add: true,
      endpoint: "http://localhost:5000/songs/",
      id: null,
    };
  },
  methods: {
    addSong() {
      const val = this.$refs.songForm.validate();
      if (!val) return;
      if (this.add) {
        axios
          .post("http://localhost:5000/songs/add", this.song)
          .then(({ data }) => {
            console.log(data);
            this.$router.push("/songs");
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } else {
        axios
          .put("http://localhost:5000/songs/edit/" + this.id, this.song)
          .then(({ data }) => {
            console.log(data);
            this.$router.push("/songs");
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    },
  },
  computed: {
    btnName() {
      return this.add ? "Add" : "Edit";
    },
  },
  created() {
    const route = this.$router.history.current;
    if (route.name == "edit") {
      this.add = false;
      this.id = route.params.id;
      axios.get(this.endpoint + route.params.id).then(({ data }) => {
        if (data) {
          this.song.artist = data.artist;
          this.song.album = data.album;
          this.song.title = data.title;
          this.song.genre = data.genre;
        } else console.log("This cannot happen");
      });
    } else {
      this.add = true;
    }
  },
};
</script>

<style scoped></style>
