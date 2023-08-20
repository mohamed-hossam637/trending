<template>
    <div class="col-lg-4 d-flex mb-3 align-items-center">
        <div class="image">
            <img v-if="cast.profile_path != null" :src="`https://image.tmdb.org/t/p/w500/${cast.profile_path}`" :alt="cast.original_name" class="img-fluid h-100">
            <span v-else class="card-img-top placeholder" style="height: 100%;cursor:text"></span>
        </div>
        <div class="info text-start ms-3">
            <p ><span class="fw-bold text-capitalize">name</span> : {{ cast.original_name }}</p>
            <p ><span class="fw-bold text-capitalize">character</span> : {{ cast.character }}</p>
        </div>
    </div>
</template>
<script>

export default {
    name: "CastComponent" ,
    props: {
        cast : Object ,
        castCount: Number
    }
}

</script>
<style scoped>
.image {
    width: 20%;
    height: 90px;
}

</style>