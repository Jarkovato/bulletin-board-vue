<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-3" color="orange" v-bind="attrs" v-on="on">
          Купить
        </v-btn>
      </template>

      <v-card>
        <v-layout column>
          <v-flex xs12>
            <v-card-title class="grey lighten-2">
              Оставить заявку
            </v-card-title>
          </v-flex>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                type="text"
                v-model="name"
                required
                validate-on-blur
                placeholder="Ваше имя"
              >
              </v-text-field>
              <v-text-field
                name="phone"
                type="text"
                v-model="phone"
                required
                validate-on-blur
                placeholder="Ваш телефон"
              >
              </v-text-field>
            </v-card-text>
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                text 
                @click="onCancel"
                :disabled="localLoading"
              >
                Закрыть
              </v-btn>
              <v-btn 
                color="orange" 
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
              >
                Купить
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
      name: '',
      phone: '',
      localLoading: false
    };
  },
  methods: {
    onCancel() {
      this.name = ''
      this.phone = ''
      this.dialog = false
    },
    onSave() {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true,

        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          postId: this.post.id,
          ownerId: this.post.ownerId
        })
        .finally(() =>{
          this.name = '',
          this.phone = '',
          this.localLoading = false,
          this.dialog = false
        })
      }
    }
  }
};
</script>
