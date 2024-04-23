<template>
    <p>
        Улица: {{ street }}, Дом: {{ home }}
        <button class="btn3" @dblclick="onDelete">Удалить</button>
    </p>
</template>

<script>
export default {
    props: ['street', 'home', 'id', 'deleteItem'],
    methods: {
        onDelete() {
            // console.log('onDelete called with id:', this.id);
            this.deleteItem(this.id);
        }
    }
};
</script>