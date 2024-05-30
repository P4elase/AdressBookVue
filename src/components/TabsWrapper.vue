<template>
    <div class="tabs">
        <slot />
        <ul class="tabs__header">
            <li v-for="title in tabTitles" :key="title" :class="{ selected: title == selectedTitle }"
                @click="selectedTitle = title">
                {{ title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, provide } from 'vue'

export default {
    setup(props, { slots }) {
        const tabTitles = ref(slots.default().map((tab) => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])

        provide("selectedTitle", selectedTitle)
        return {
            selectedTitle,
            tabTitles,
        }
    },
}

</script>

<style scoped>
.tabs {
    max-width: 97%;
    margin: 0em auto;
    max-height: 80vmax;
    margin-bottom: 1em;
}

ul {
    display: flex;
}

.tabs__header {
    background-color: rgb(18, 166, 203);
    border-radius: 5%;
    list-style: none;
    padding-left: 0em;
    padding-right: 0em;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0em;
    right: 0em;
    left: 0em;
    margin: 0%;
    width: 100%;
    z-index: 1000;
    height: 10vh;
}

.tabs__header li {
    color: black;
    width: 5em;
    text-align: center;
    padding: 1em 1em 1em;
    margin: 0.5em 0.5em 0.5em;
    background-color: #ddd;
    border-radius: 0.5em;
    cursor: pointer;
    transition: 0.4s all ease-out;
}

.tabs__header li.selected {
    background-color: #0984e3;
    color: white;
}

@media only screen and (min-width: 649px) {
    .tabs {
    max-width: 100%;
    margin: 0em auto;
    max-height: 100%;
    margin-bottom: 1em;
}

ul {
    display: flex;
}

.tabs__header {
    background-color: rgb(18, 166, 203);
    position: relative;
    list-style: none;
    padding-left: 0em;
    padding-right: 0em;
    display: flex;
    justify-content: center;
    margin: 0%;
    width: 100%;
    z-index: 1000;
}

.tabs__header li {
    color: black;
    width: 6em;
    text-align: center;
    padding: 1em 1em 1em;
    margin: 0.5em 0.5em 0.5em;
    background-color: #ddd;
    border-radius: 0.5em;
    cursor: pointer;
    transition: 0.4s all ease-out;
}

.tabs__header li.selected {
    background-color: #0984e3;
    color: white;
}
}
</style>