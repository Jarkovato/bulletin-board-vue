import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Registration from '../components/Auth/Registration'
import AllPosts from '../components/Posts/AllPosts'
import MyPosts from '../components/Posts/MyPosts'
import NewPost from '../components/Posts/NewPost'
import Post from '../components/Posts/Post'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/orders',
    name: 'allPosts',
    component: AllPosts,
    beforeEnter: AuthGuard
  },
  {
    path: '/new',
    name: 'newPost',
    component: NewPost,
    beforeEnter: AuthGuard
  },
  {
    path: '/list',
    name: 'MyPosts',
    component: MyPosts,
    beforeEnter: AuthGuard
  },
  {
    path: '/post/:id',
    props: true,
    name: 'post',
    component: Post,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
