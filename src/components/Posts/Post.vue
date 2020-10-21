<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card class="mt-5  pa-5" v-if="!loading"> 
          <v-layout row justify-center align-center>
            <v-flex xs12 sm6>
            <v-img :src="post.imageSrc" contain max-width="400px" max-height="400px"></v-img>
            </v-flex>
            <v-flex xs12 sm6>
              <v-layout column align-center>
              <v-card-title class="orange--text text-center">{{ post.title }}</v-card-title>
              <v-card-text class="text-center">{{ post.description }}</v-card-text>
              <v-card-actions class="mt-1">
                <appEditPostModal :post="post" v-if="isOwner"></appEditPostModal>
                <app-buy-modal v-if="!isOwner" :post="post"></app-buy-modal>
              </v-card-actions>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditPostModal from "./EditPostModal";

export default {
  props: ["id"],
  computed: {
    post() {
      const id = this.id;
      return this.$store.getters.postById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      // проверка айди пользователя для отображения текущих объявлений
      return this.post.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    appEditPostModal: EditPostModal,
  },
};
</script>
