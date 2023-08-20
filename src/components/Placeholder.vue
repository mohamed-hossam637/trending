<template>
    <div v-for="placeholder in placeholder_count" class=" col-lg-2 col-6" aria-hidden="true">
        <span  class="card-img-top placeholder" style="height: 120px;"></span>
        <div class="card-body">
            <h5 class="card-title placeholder-glow">
                <span class="placeholder col-12"></span>
            </h5>
            <p class="card-text placeholder-glow">
                <span class="placeholder col-4"></span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name : "Placeholder" , 
    data() {
        return {
            "placeholder_count" : 5
        }
    }
}

</script>