<template>
    <div class="banner pt-3" :style="{ backgroundImage: `url(${background})` }">
        <div class="container">
            <div class="row gap-2">
                <div class="poster col-lg-3">
                    <img v-if="MovieData" :src="`https://image.tmdb.org/t/p/w500/${MovieData.poster_path}`"
                        :alt="MovieData.title" class="img-fluid">
                </div>
                <div v-if="MovieData" class="data col-lg-6 text-start">
                    <h1 class="text-light">{{ (MovieData.title || MovieData.original_name) + ' (' + productionYear + ')' }}
                    </h1>
                    <p class="tagline text-light">{{ `# ${MovieData.tagline}` }}</p>
                    <div class="d-flex align-items-center my-3">
                        <p class="tagline text-light m-0">{{ formatDate }}</p>
                        <div class="d-flex align-items-center ms-3 genres pe-1 ps-1">
                            <p class="text-light ms-2 fw-bold m-0" v-for="genre in MovieData.genres" :key="genre.id">{{
                                genre.name }}</p>
                        </div>
                    </div>
                    <div class="overview">
                        <h4 class="text-light text-capitalize">overview</h4>
                        <p class="text-light">{{ MovieData.overview }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- start cast section -->
    <div class="container mt-4">
        <h4 class="text-capitalize text-start fw-bold">cast</h4>
        <div class="row pt-4">
            <CastComponent v-for="cast in limitCast"  :cast="cast" :key="cast.credit_id" :castCount="castLength"/>
            <router-link :to="{name: 'movie-cast' , params:{media: media, id: id}}" class="col-lg-4 d-flex mb-3 align-items-center text-dark justify-content-between p-3 fw-bold mt-3 shadow-sm text-uppercase" v-if="castLength > 6">
                show more <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </router-link>
        </div>
    </div>

    <!-- start crew section -->
    <div class="container mt-4">
        <h4 class="text-capitalize text-start fw-bold">crew</h4>
        <div class="row pt-4">
            <CrewComponent v-for="crew in limitCrew"  :crew="crew" :key="crew.credit_id" />
            <router-link :to="{name: 'movie-crew' , params:{media: media, id: id}}" class="col-lg-4 d-flex mb-3 text-dark align-items-center justify-content-between p-3 fw-bold mt-3 shadow-sm text-uppercase" v-if="crewLength > 6">
                show more <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </router-link>
        </div>
    </div>

    <!-- start recommendations section -->
    <div class="container recommendations mt-4">
        <h4 class="text-capitalize text-start fw-bold">recommendations</h4>
        <div class="row gap-1 trending-movie-row py-3">
            <MediaBox v-if="recommendations.length > 0" v-for="movie in recommendations" :key="movie.id" :movieData="movie"
                :media="media" />
            <Placeholder v-else />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import MediaBox from "@/components/MediaBox.vue";
import Placeholder from "@/components/Placeholder.vue";
import CastComponent from "@/components/CastComponent.vue";
import CrewComponent from "@/components/CrewComponent.vue";
import { WatchEffect, watchEffect } from "vue";

export default {

    name: 'MovieDetails',
    components: {
        MediaBox,
        Placeholder ,
        CastComponent ,
        CrewComponent
    },
    props: ["id", "media"],
    data() {
        return {
            "MovieData": null,
            'cast': null,
            'crew' : null ,
            'recommendations': []
        }
    },
    created() {

        watchEffect(() => {

            this.scrollToTop()

            // get media data
            axios.get(`https://api.themoviedb.org/3/${this.media}/${this.id}?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US`).then((res) => { this.MovieData = res.data }).catch((err) => console.log(err));

            // get media credits
            axios.get(`https://api.themoviedb.org/3/${this.media}/${this.id}/credits?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US`).then((res) => { 
                this.cast = res.data.cast ;
                this.crew = res.data.crew ;
            }).catch((err) => console.log(err));

            // get media recommendations
            axios.get(`https://api.themoviedb.org/3/${this.media}/${this.id}/recommendations?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US&page=1`).then((res) => { this.recommendations = res.data.results}).catch((err) => console.log(err));
        })

    },
    methods: {
        scrollToTop() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    },
    computed: {
        background() {
            if (this.MovieData !== null) {
                return `https://image.tmdb.org/t/p/w500/${this.MovieData.backdrop_path}`
            } else {
                return null;
            }
        },
        productionYear() {
            if (this.MovieData !== null) {
                return this.MovieData.release_date ? this.MovieData.release_date.split('-')[0] : this.MovieData.first_air_date.split('-')[0];
            } else {
                return null;
            }
        },
        formatDate() {
            if (this.MovieData !== null) {
                return this.MovieData.release_date ? this.MovieData.release_date.split('-').reverse().join('/') : this.MovieData.first_air_date.split('-').reverse().join('/');
            } else {
                return null;
            }
        } ,
        limitCast() {
            return this.cast != null  ? this.cast.filter((e , i)=> e.profile_path != null && i <= 5) : null;
        } ,
        limitCrew() {
            return this.crew != null  ? this.crew.filter((e , i)=> e.profile_path != null && i <= 5) : null;
        } ,
        castLength() {
            return this.cast != null  ? this.cast.length : 0;
        },
        crewLength() {
            return this.crew != null  ? this.crew.length : 0;
        }
    }
}

</script>
<style scoped>
.banner {
    min-height: 70vh;
    background-color: #fff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
}

.banner::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(3, 37, 65, 0.56);
    z-index: -1;
}

.banner .container .row {
    align-items: center;
}

.poster {
    /* margin-top: 10%; */
    overflow: hidden;
    border-radius: 6px;
}

.tagline {
    font-size: 0.989em;
    text-align: left;
}

.genres {
    position: relative;
}

.genres::after,
.genres::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    transform: translateY(-50%);
}

.genres::after {
    right: -4px;
}

.trending-movie-row {
    flex-wrap: nowrap;
    overflow-x: scroll;
}
</style>