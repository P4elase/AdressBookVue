<template>
    <div>
        <div class="input">
            <input type="text" ref="street" v-model="street" placeholder="Улица" required>
            <input type="number" v-model="home" placeholder="Дом">
        </div>
        <div id="org_div0">
            <button @click="createList">Добавить адрес</button>
        </div>

        <div id="org_div1" style="display: none;">≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡</div>
        <h3 v-if="isEmptyList">Ваш список пуст</h3>

        <div class="scrollable-list">
            <!-- Использование компонента StreetItem для каждого элемента списка -->
            <StreetItem v-for="item in streets" :key="item.id" :street="item.street" :home="item.home" :id="item.id"
                :deleteItem="deleteItem" />

        </div>
        <div id="org_div2" style="display: none;">≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡</div>

        <div id="org_div3">
            <button id="btn2" @click="clearAll">Очистить весь список</button>
        </div>
    </div>
</template>

<script>
import StreetItem from './StreetItem.vue';

export default {
    components: {
        StreetItem,
    },
    data() {
        return {
            street: '',
            home: '',
            streets: [],
            isEmptyList: true,
        };
    },
    mounted() {
        this.loadList();
    },
    methods: {
        loadList() {
            // Проверяем, существует ли ключ 'streets' в localStorage
            if (localStorage.getItem('streets') !== null) {
                // Если ключ существует, парсим и присваиваем значение переменной this.streets
                this.streets = JSON.parse(localStorage.getItem('streets'));
                // Если список не пуст, устанавливаем isEmptyList в false
                this.isEmptyList = this.streets.length === 0;
            } else {
                // Если ключ не существует, создаем пустой массив и сохраняем его в localStorage
                this.streets = [];
                localStorage.setItem('streets', JSON.stringify(this.streets));
                // Устанавливаем isEmptyList в true, так как список пуст
                this.isEmptyList = true;
            }
        },

        createList() {
            if (this.street && this.home) {
                if (Math.sign(this.home) <= 0) {
                    alert("Введите корректный номер дома");
                    this.home = '';
                    return;
                }
                const id = Date.now() + Math.random().toString(36).substr(2, 9);
                const newStreet = { id, street: this.street, home: this.home };
                this.streets.push(newStreet);
                this.saveToLocalStorage();
                this.street = '';
                this.home = '';
                this.$refs.street.focus();
                this.loadList();
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        },
        deleteItem(id) {
            // Фильтрация массива, чтобы удалить элемент с указанным ID
            this.streets = this.streets.filter(item => item.id !== id);
            // Сохранение обновленного списка в localStorage
            this.saveToLocalStorage();
            this.loadList();
        },
        clearAll() {
            if (Object.keys(this.streets).length > 0) {
                if (confirm("Удалить все записи?")) {
                    this.streets = [];
                    this.saveToLocalStorage();
                    this.loadList();
                }
            } else {
                alert("Ваш список уже пустой");
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('streets', JSON.stringify(this.streets));
        },
    },
};
</script>

<style scoped>
.scrollable-list {
    max-height: 45vh; /* Высота контейнера, при превышении которой появляется полоса прокрутки */
    overflow-y: auto; /* Автоматическая прокрутка по вертикали */
}
#btn2{
    margin-top: 0.5em;
}
</style>