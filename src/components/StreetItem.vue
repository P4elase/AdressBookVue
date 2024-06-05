<template>
    <p>
        {{ address }}
        <button class="btn3" @dblclick="$emit('delete-item', id)"><img src="../img/trash3.svg"></button>
    </p>
</template>

<script setup lang="ts">
defineProps<{
    address: string;
    id: string;
}>();
</script>

<style>

.btn3>img{
  max-width: 1.2em;
  max-height: 1.2em;
}

</style>