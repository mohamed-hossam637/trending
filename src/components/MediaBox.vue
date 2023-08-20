<template>
    <router-link v-if="movieData" :to="{ name: 'movie-details', params: {media: media ,  id: movieData.id } }" class="col-lg-2 col-6">
        <img class="img-fluid" :src="`https://image.tmdb.org/t/p/w500/` + movieData.poster_path" :title="movieData.title"
            :alt="movieData.title" loading="lazy">
        <h5 class="text-dark m-2 movie-title">{{ movieData.title || movieData.name }}</h5>
        <p class="m-1 text-dark release-date" style="text-align: left;">{{ movieData.release_date ||
            movieData.first_air_date }}</p>
    </router-link>
</template>
<script>
import axios from "axios";

export default {
    name: 'MediaBox',
    props: {
        movieData: Object ,
        media: String
    } , 
    created() {

    }
}

</script>
<style scoped>
.movie-title {
    text-align: left;
}

.release-date {
    text-align: left;
}

@media(max-width: 767px) {
    .movie-title {
        text-align: left;
        font-size: 0.998em;
    }

    .release-date {
        text-align: left;
        font-size: 0.8em;
    }
}
</style>