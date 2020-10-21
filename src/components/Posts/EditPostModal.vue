<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-3" v-bind="attrs" v-on="on">
          Редактировать
        </v-btn>
      </template>

      <v-card>
        <v-layout column>
          <v-flex xs12>
            <v-card-title class="grey lighten-2">
              Редактировать объявление
            </v-card-title>
          </v-flex>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                type="text"
                v-model="editedTitle"
                required
                validate-on-blur
                placeholder="Заголовок"
              >
              </v-text-field>
              <v-textarea
                name="description"
                type="text-area"
                v-model="editedDescription"
                required
                validate-on-blur
                maxlength="240"
                counter
                auto-grow
                placeholder="Описание"
              >
              </v-textarea>
            </v-card-text>
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel">
                Отменить
              </v-btn>
              <v-btn color="orange" @click="onSave">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      dialog: false,
      editedDescription: this.post.editedDescription,
      editedTitle: this.post.editedTitle
    };
  },
  methods: {
    onCancel() {
      this.editedDescription = this.post.description
      this.editedTitle = this.post.title
      this.dialog = false
    },
    onSave() {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updatePost', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.post.id
        })
        this.dialog = false 
      }
    }
  }
};
</script>
