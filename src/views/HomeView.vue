<template>
  <div class="home-wrap" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500//aSGSxGMTP893DPMCvMl9AdnEICE.jpg)' }">
    <div class="container h-100  d-flex align-items-center">
      <h1 class="text-capitalize fw-bold text-light ">trending movies</h1>
    </div>
  </div>
  <div class="container ">
    <div class="section-header">
      <h3 class="text-capitalize p-3 pb-1 mt-4 text-start" >trending</h3>
      <ul class="week-day p-1 mt-4"> 
        <li class="day text-capitalize p-1 active" @click="TrendingDay" ref="input">today</li>
        <li class="week text-capitalize p-1 ms-3" @click="trendingWeek">this week</li>
      </ul>
    </div>
    <div class="row gap-1 trending-movie-row py-3">
      <MediaBox v-if="trending_movies.length > 0" v-for="movie in trending_movies" :key="movie.id" :movieData="movie" :media="'movie'"/>
        <Placeholder v-else />
    </div>
    <div class="row gap-1 trending-movie-row py-3">
      <MediaBox v-if="trending_tv.length > 0" v-for="tv in trending_tv" :key="tv.id" :movieData="tv" :media="'tv'"/>
      <Placeholder v-else />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import MediaBox from "@/components/MediaBox.vue";
import Placeholder from "@/components/Placeholder.vue";
import banner from "@/assets/images/banner.jpg"
import { ref } from "vue";



export default {
  name: 'HomeView',
  components: {
    MediaBox ,
    Placeholder
  },
  data() {
    return {
      'trending_movies': [],
      'trending_tv': [] ,
      'banner' : banner
    }
  },
  created() {
    axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=fb0ce91ffb7e4ce36ebe5882861ff595').then((res) => this.trending_movies = res.data.results).catch((err) => console.log(err));

    axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=fb0ce91ffb7e4ce36ebe5882861ff595').then((res) => this.trending_tv = res.data.results).catch((err) => console.log(err));

    console.log(this.$refs)

  },
  methods:{
    TrendingDay () {
      axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=fb0ce91ffb7e4ce36ebe5882861ff595').then((res) => this.trending_movies = res.data.results).catch((err) => console.log(err));
      axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=fb0ce91ffb7e4ce36ebe5882861ff595').then((res) => this.trending_tv = res.data.results).catch((err) => console.log(err));
    } ,
    trendingWeek() {
      axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=fb0ce91ffb7e4ce36ebe5882861ff595').then((res) => this.trending_movies = res.data.results).catch((err) => console.log(err));
      axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=fb0ce91ffb7e4ce36ebe5882861ff595').then((res) => this.trending_tv = res.data.results).catch((err) => console.log(err));
    } 
  },
  computed: {
    background() {
      return this.trending_movies.length ? "https://image.tmdb.org/t/p/w500/" + this.trending_movies[Math.floor(Math.random() * this.trending_movies.length)].backdrop_path : '';
    }
  }
}
</script>
<style scoped>
.home-wrap {
  height: 60vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 1;
}

.home-wrap::after{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(3, 37, 65, 0.56);
  z-index: -1;
}

.trending-movie-row {
  flex-wrap: nowrap;
  overflow-x: scroll;
}
.section-header{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.section-header .week-day {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  border: 1px solid #33333352;
  border-radius: 15px;
}
.section-header .week-day li {
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.3s;
}
.section-header .week-day li.active ,
.section-header .week-day li:hover{
  background-color: var(--bs-primary);
  color: #fff;
}
</style>