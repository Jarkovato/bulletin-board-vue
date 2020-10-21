import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store/index'
import * as fb from 'firebase'
import BuyModalComponent from './components/Shared/ByModal.vue'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyDHMbqkBg5LEzSj4iNW-8RL8uyWofLwrok',
      authDomain: 'vue-bulletin-board-c8ec1.firebaseapp.com',
      databaseURL: 'https://vue-bulletin-board-c8ec1.firebaseio.com',
      projectId: 'vue-bulletin-board-c8ec1',
      storageBucket: 'vue-bulletin-board-c8ec1.appspot.com',
      messagingSenderId: '146455383263',
      appId: '1:146455383263:web:6e6474081b5724bacb6d6a'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchPosts', )
  }
}).$mount('#app')
