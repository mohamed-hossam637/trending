<template>
    <div class="col-lg-4 d-flex mb-3 align-items-center">
        <div class="image">
            <img v-if="crew.profile_path != null" :src="`https://image.tmdb.org/t/p/w500/${crew.profile_path}`" :alt="crew.original_name" class="img-fluid h-100">
            <span v-else class="card-img-top placeholder" style="height: 100%;cursor:text"></span>
        </div>
        <div class="info text-start ms-3">
            <p ><span class="fw-bold text-capitalize">name</span> : {{ crew.original_name }}</p>
            <p ><span class="fw-bold text-capitalize">job</span> : {{ crew.job }}</p>
        </div>
    </div>
</template>
<script>

export default {
    name: "CastComponent" ,
    props: {
        crew : Object 
    }
}

</script>
<style scoped>
.image {
    width: 20%;
    height: 90px;
}

</style>