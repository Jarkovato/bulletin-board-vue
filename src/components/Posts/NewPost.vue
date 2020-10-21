<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="text--secondary my-3">Создать объявление</h2>
        <v-form v-model="valid" ref="form" lazy-validation class="px-5">
          <v-text-field
            type="text"
            label="Заголовок"
            name="title"
            hint="Не менее 6 символов"
            v-model="title"
            :rules="titleRules"
            validate-on-blur
            required
          ></v-text-field>
          <v-textarea
            type="text-area"
            rows="1"
            name="description"
            label="Описание"
            hint="Описание товара или услуги"
            v-model="description"
            :rules="descriptionRules"
            required
            validate-on-blur
            maxlength="240"
            counter
            auto-grow
          ></v-textarea>
          <v-file-input
            @change="onFileChange"
            accept="image/*"
            type="file"
            label="Загрузите изображение"
            :rules="fileRules"
            required
            validate-on-blur
          ></v-file-input>
           <v-checkbox
              label="Рекламное объявление"
              v-model="promo"
              class="mb-2"
            ></v-checkbox>
          <v-flex text-center>
            <v-btn @click="createPost" :disabled="!valid || loading" :loading="loading">
              Добавить
            </v-btn>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: '',
      titleRules: [
        (v) => !!v || "Добавьте заголовок",
        (v) => (v && v.length >= 6) || "Минимум 6 символов",
      ],
      descriptionRules: [
        (v) => !!v || "Добавьте описание",
        (v) => (v && v.length <= 240) || "Максимум 240 символов",
      ],
      fileRules: [
        (v) => !!v || "Добавьте изображение"
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    createPost() {
      if (this.$refs.form.validate()) {
        const newPost = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        };
        console.log(newPost)
        this.$store.dispatch('createPost', newPost).
          then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    onFileChange(file) {
      // получаем файл
      const reader = new FileReader()
      // прослушка события чтения
      reader.onload = () => {
        this.imageSrc = reader.result
      }
      // читаем файл
      reader.readAsDataURL(file)
      //помещаем файл в переменную 
      this.image = file
    }
  },
};
</script>
