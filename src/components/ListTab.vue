<template>

  <div class="inputs">
    <label>
      Поиск по карте
      <input v-model="search" type="text" list="search" placeholder="Начните вводить для поиска" autocomplete="off"
        @change="onSearchChange">
      <datalist id="search">
        <option v-for="(item, index) in searchResponse ?? []" :key="item.geometry?.coordinates.join(',') ?? index"
          :value="item.geometry?.coordinates">
          {{ item.properties.name }} ({{ item.properties.description }})
        </option>
      </datalist>
    </label>
  </div>

  <div>
    <yandex-map v-model="map" :settings="{
      location: {
        center: [43.958455, 56.326036],
        zoom: 10,
      },
    }" width="100%" height="0vh">
    </yandex-map>
    <h3 v-if="isEmptyList">Ваш список пуст</h3>
    <datalist id="search">
      <option v-for="(item, index) in searchResponse ?? []" :key="item.geometry?.coordinates.join(',') ?? index"
        :value="item.geometry?.coordinates" :id="`search-option-${item.geometry?.coordinates}`">
        {{ item.properties.name }} ({{ item.properties.description }})
      </option>
    </datalist>

    <div class="scrollable-list">
      <StreetItem v-for="item in streets" :key="item.id" :address="item.address" :id="item.id"
        @delete-item="deleteItem" />
    </div>

    <div id="org_div3">
      <button id="btn2" @click="clearAll">Очистить весь список</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, watch } from 'vue';
import StreetItem from './StreetItem.vue';

import { LngLat, YMap } from '@yandex/ymaps3-types';
import { SearchResponse } from '@yandex/ymaps3-types/imperative/search';
import { YandexMap } from 'vue-yandex-maps';

//////////////////////////////////Поиск по карте////////////////////////////////
const map = shallowRef<null | YMap>(null);

const selectedSearch = ref<LngLat | null>(null);

const search = ref('');
const searchResponse = shallowRef<null | SearchResponse>(null);

//search
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

watch(search, async (val) => {
  if (!val) return;

  // Проверка, что уже координаты
  if (val.split(/[,.]/).length === 4) {
    selectedSearch.value = val.split(',').map((x) => parseFloat(x)) as LngLat;
    return;
  }

  await sleep(300);
  if (val !== search.value) return;

  searchResponse.value = await ymaps3.search({
    text: val,
    bounds: map.value?.bounds,
  });

}
);

//////////////////////////predlozhka phind
// Добавьте эту функцию в ваш скрипт
function onSearchChange(event) {
  const selectedValue = event.target.value; // Получаем выбранное значение из input
  const selectedCoordinates = selectedValue.split(','); // Разбиваем координаты на отдельные значения

  // Создаем объект с выбранными данными
  const selectedAddress = {
    id: Date.now() + Math.random().toString(36).substr(2, 9),
    coordinates: selectedCoordinates,
    address: searchResponse.value.find(item => item.geometry?.coordinates.join(',') === selectedValue)?.properties.name || ''
  };

  // Читаем текущие данные из локального хранилища
  let currentStreets = JSON.parse(localStorage.getItem('streets')) || [];

  // Добавляем новый объект в массив
  currentStreets.push(selectedAddress);

  // Сохраняем обновленный массив обратно в локальное хранилище
  localStorage.setItem('streets', JSON.stringify(currentStreets));
  search.value = ''; // Очищаем поле ввода
  loadList();
}







































//////////////////////////////////Создание и обновление списка////////////////////////////////
interface StreetItemInterface {
  id: string;
  address: string;
}

let streets = ref<StreetItemInterface[]>([]);
let isEmptyList = ref(true);

onMounted(loadList);

async function loadList() {
  const storedStreets = localStorage.getItem('streets');
  if (storedStreets) {
    streets.value = JSON.parse(storedStreets);
    isEmptyList.value = streets.value.length === 0;
  } else {
    streets.value = [];
    localStorage.setItem('streets', JSON.stringify(streets.value));
    isEmptyList.value = true;
  }
}

function deleteItem(id: string) {
  streets.value = streets.value.filter(item => item.id !== id);
  saveToLocalStorage();
  loadList();
}

function clearAll() {
  if (streets.value.length > 0) {
    if (confirm("Удалить все записи?")) {
      streets.value = [];
      saveToLocalStorage();
      loadList();
    }
  } else {
    alert("Ваш список уже пустой");
  }
}

function saveToLocalStorage() {
  localStorage.setItem('streets', JSON.stringify(streets.value));
}
</script>



<style scoped>
.scrollable-list {
  max-height: 45vh;
  overflow-y: auto;
}

.hidden-element {
  display: none;
}

#btn2 {
  margin-top: 0.5em;
}

.inputs {
  display: grid;
  grid-template-columns: repeat(1, 80%);
  justify-content: space-between;
  margin-bottom: 20px;

  label {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      padding: 10px;
      border-radius: 5px;
      color: var(--vp-button-alt-text);
      background: var(--vp-button-alt-bg);
    }
  }
}
</style>
