<template>
    <div class="tab-content" v-show="title == selectedTitle">
        <slot />
    </div>
    </template>

<script>
import { inject } from 'vue'

export default {
    props: ['title','icon'],
    setup () {
        const selectedTitle = inject("selectedTitle")

        return{
            selectedTitle
        }
    }

}

</script>

<style scoped>
.tab-content{
    min-height: 80vh;
    max-height: 90vh;
    /* padding: 0.5em; */
    border-radius: 5px;
    box-shadow: 0 3px 5px 5px rgba(0, 0, 0, 0.05);
}
</style>