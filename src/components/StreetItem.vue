<template>
    <p>
        {{ address }}
        <button class="btn3" @dblclick="$emit('delete-item', id)">Удалить</button>
    </p>
</template>

<script setup lang="ts">
defineProps<{
    address: string;
    id: string;
}>();
</script>
