import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetails from '../views/MovieDetails.vue';
import AllCast from "../views/AllCast.vue";
import AllCrew from "../views/AllCrew.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path : '/movie-details/:media/:id' ,
    name : 'movie-details' ,
    component : MovieDetails ,
    props :true
  } ,
  {
    path : '/movie-details/:media/:id/cast' ,
    name : 'movie-cast' ,
    component : AllCast ,
    props :true
  } ,
  {
    path : '/movie-details/:media/:id/crew' ,
    name : 'movie-crew' ,
    component : AllCrew ,
    props :true
  } ,


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
