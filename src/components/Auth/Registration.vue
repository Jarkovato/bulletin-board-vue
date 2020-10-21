<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm9 md4 >
        <h2 class="text--secondary mb-3">Регистрация</h2>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            prepend-icon="mdi-account"
            label="Имя" 
            name="name"
            v-model="name"
            :rules="nameRules"
            hint="Не менее 2 символов"
            required
            validate-on-blur
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-login"
            label="Email" 
            name="email"
            v-model="email"
            :rules="emailRules"
            required
            validate-on-blur
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-lock"
            name="password"
            type="password"
            label="Пароль"
            :couter="6"
            hint="Не менее 6 символов"
            v-model="password"
            :rules="passwordRules"
            required
            validate-on-blur
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-lock"
            name="confirm-password"
            type="password"
            label="Подтвердите пароль"
            :couter="6"
            hint="Не менее 6 символов"
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            required
            validate-on-blur
          ></v-text-field>
          <v-flex text-center>
            <v-btn
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
            >
              Регистрация
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
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      valid: false,
      nameRules: [
        v => !!v || 'Имя обязательно для заполнения',
        v => (v && v.length >= 2) || 'Минимум 2 символа'
      ],
      emailRules: [
        v => !!v || 'Поле Email обязательно для заполнения',
        v => /.+@.+\..+/.test(v) || 'Некорректный Email'
      ],
      passwordRules: [
        v => !!v || 'Введите пароль',
        v => (v && v.length >= 6) || 'Минимум 6 символов'
      ],
      confirmPasswordRules: [
        v => !!v || 'Введите пароль',
        v => v === this.password || 'Пароли не совпадают'
      ]
    };
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {})
      }
     
    }
  }
};
</script>
