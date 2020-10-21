<template>
  <div v-if="!loading">
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="promoPost in promoPosts"
              :key="promoPost.id"
              :src="promoPost.imageSrc"
              contain
            >
            <div class="carousel-link">
              <v-btn color="orange" :to="'/post/' + promoPost.id"> {{ promoPost.title }}</v-btn>
            </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          xs12
          sm6
          md4
          v-for="post of posts"
          :key="post.id"
        >
          <v-card class="mx-auto elevation-10" max-width="400" xs12 md4 lg4>
            <v-img
              class="orange--text align-start"
              height="200px"
              :src="post.imageSrc"
              alt="post.title"
              contain
            >
              <v-card-title>{{ post.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              {{ post.title }}
            </v-card-subtitle>

            <v-card-text max-height="10px" class="text--primary text--overflow">
              <div> {{ post.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" text :to="'/post/' + post.id">
                Подробнее
              </v-btn>
              <app-buy-modal :post="post"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row align-center class="fullsize">
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
  </div>
</template>

<script>
export default {
  computed: {
    promoPosts () {
      return this.$store.getters.promoPosts
    },
    posts () {
      return this.$store.getters.posts
    },
    loading() {
      return this.$store.getters.loading
    },
  }
};
</script>

<style lang="scss">
  .carousel-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 5px 5px;
    border-radius: 5px;
  }

  .text--overflow {
    height: 50px;
    overflow: scroll;
  }
  .fullsize {
    height: 100vh;
  }
</style>
