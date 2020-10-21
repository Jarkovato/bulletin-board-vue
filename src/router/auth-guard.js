import store from '../store/index'

export default function (from, to, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/login?loginError=true')
  }

}