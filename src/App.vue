<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item :to="link.url" v-for="link of links" :key="link.title">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left>
                {{ link.icon }}
              </v-icon>
              {{ link.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left>
                mdi-logout
              </v-icon>
              Выйти
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark color="#37474F">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">
          Доска объявлений</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          small
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-icon color="teal darken-2" left>
            {{ link.icon }}
          </v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn
          text
          small
          @click="onLogout"
          v-if="isUserLoggedIn"
        >
        <v-icon left color="teal darken-2" >mdi-logout</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>

    <template>
      <v-snackbar
        v-if="error"
        :timeout="5000"
        :multi-line="true"
        color="373737"
        @input="closeError"
        :value="true"
      >
        <v-layout column align-center>
          <div class="pa-2 font-weight-black">{{ error }}</div>
          <v-btn color="orange" medium @click.native="closeError">
            Закрыть
          </v-btn>
        </v-layout>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    error () {
      return this.$store.getters.error;
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: "Покупатели", icon: "mdi-book-open", url: "/orders" },
          { title: "Добавить", icon: "mdi-playlist-plus", url: "/new" },
          { title: "Мои объявления", icon: "mdi-clipboard-list", url: "/list" }
        ]
      }

      return [
        { title: "Логин", icon: "mdi-login", url: "/login" },
        { title: "Регистрация", icon: "mdi-account-plus", url: "/registration"}
      ]
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
h2 {
  text-align: center;
}
</style>
