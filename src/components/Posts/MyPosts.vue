<template>
  <v-container>
    <v-layout row v-if="!loading && myPosts.length !== 0">
      <v-flex xs12 sm8 offset-sm2>
        <h2 class="text--secondary my-3">Мои объявления</h2>
        <v-card
          class="mb-5 mx-1"
          elevation="10"
          v-for="post in myPosts"
          :key="post.title"
        >
          <v-layout row class="ma-0">
            <v-flex xs12 sm6>
              <v-img
                max-width="300px"
                max-height="200px"
                class="orange--text ma-1"
                :src="post.imageSrc"
                alt="post.title"
                contain
              >
              </v-img>
            </v-flex>
            <v-flex align-self-start sm6>
              <v-card-title class="text-h6 orange--text text-no-wrap">
                {{ post.title }}</v-card-title
              >
              <v-card-text>{{ post.description }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="'/post/' + post.id">Открыть</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myPosts.length === 0">
      <v-flex xs12 class="text-xs-center">
        <h2 class="text--secondary mt-5">
          У вас пока что нет своих объявлений
        </h2>
      </v-flex>
    </v-layout>
    <v-layout row align-center class="fullsize" v-else>
      <v-flex xs12 class="text-center">
        <v-progress-circular
          indeterminate
          color="orange"
          size="128"
          width="8"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    myPosts() {
      return this.$store.getters.myPosts;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

