<template>
    <div class="container">
        <div class="row py-4 text-start  ">
            <span @click="back" style="cursor: pointer;" class="ms-3 d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg> <span class="ms-2 fw-bold">back </span> </span>
        </div>
        <div class="row mb-4" v-if="MovieData">
            <div class="col-lg-6 d-flex align-items-center">
                <div class="image" style="height: 130px;">
                    <img class="img-fluid h-100" :src="`https://image.tmdb.org/t/p/w500/${MovieData.poster_path}`" alt="">
                </div>
                <div class="info ps-1">
                    <h3 class="fw-bold">{{ MovieData.title || MovieData.name }}</h3>
                </div>
            </div>
        </div>
        <h3 class="fw-bold text-capitalize text-start">crew</h3>
        <div class="row pt-4" v-if="castData">
            <CrewComponent v-for="cast in castData" :crew="cast" :key="cast.credit_id"  />
        </div>
    </div>
</template>
<script>
import CrewComponent from '@/components/CrewComponent.vue';
import axios from 'axios';

export default {
    name: "AllCast",
    components: {
        CrewComponent
    },
    data() {
        return {
            "MovieData": null ,
            "castData" : null

        }
    },
    props: ['id', 'media'],
    created() {
        // get media data
        axios.get(`https://api.themoviedb.org/3/${this.media}/${this.id}?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US`).then((res) => { this.MovieData = res.data }).catch((err) => console.log(err));

        axios.get(`https://api.themoviedb.org/3/${this.media}/${this.id}/credits?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US`).then((res) => { 
                this.castData = res.data.crew ;
            }).catch((err) => console.log(err));
    } ,
    methods:{
        back(){
            this.$router.go(-1);
        }
    }
}

</script>