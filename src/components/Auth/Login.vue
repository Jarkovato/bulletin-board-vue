<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm9 md4>
        <h2 class="text--secondary mb-3">Логин</h2>
        <v-form v-model="valid" ref="form" lazy-validation>
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
          <v-flex text-center>
            <v-btn 
              @click="onSubmit" 
              :loading="loading"
              :disabled="!valid || loading"
            >
              Войти
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
      email: "",
      password: "",
      valid: false,
      emailRules: [
        (v) => !!v || "Поле Email обязательно для заполнения",
        (v) => /.+@.+\..+/.test(v) || "Некорректный Email",
      ],
      passwordRules: [
        (v) => !!v || "Поле пароль обязательно для заполнения",
        (v) => (v && v.length >= 6) || "Минимум 6 символов",
      ],
    };
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    },
  },
  created() {
    if (this.$route.query['loginError']) {
      this.$store.dispatch('setError', 'Не достпуно для незарегистрированных пользователей')
    }
  }
};
</script>
