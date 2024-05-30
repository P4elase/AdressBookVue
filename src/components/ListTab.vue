<template>

  <h2>Поиск по карте</h2>
  <div class="container">
      <div class="inputs">
        <div class="col-12">
          <label>
            <input class="col-12" v-model="search" type="search" list="search" placeholder="Начните вводить для поиска" autocomplete="off" @focusin="showDropdown" @focusout="hideDropdown" >
          </label>
        </div>
      </div>
      <dropdown-list class="col-9" id="search">
        <option v-for="(item, index) in searchResponse ?? []" :key="item.geometry?.coordinates.join(',') ?? index"
          :value="item.geometry?.coordinates" :id="`search-option-${item.geometry?.coordinates}`"
          @click="onSearchChange">
          {{ item.properties.name }} ({{ item.properties.description }} )
      </option>
      </dropdown-list>
  </div>
  <br>

  <div>
    <yandex-map v-model="map" :settings="{
      location: {
        center: [43.958455, 56.326036],
        zoom: 10,
      },
    }" width="100%" height="0vh">
    </yandex-map>
    <h3 v-if="isEmptyList">Ваш список пуст</h3>
    
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

watch(search, async (val) => {
  if (!val) return;

  if (val.split(/[,.]/).length === 4) {
    selectedSearch.value = val.split(',').map((x) => parseFloat(x)) as LngLat;
    return;
  }

  await sleep(300);
  if (val !== search.value) return;

  // eslint-disable-next-line no-undef
  searchResponse.value = await ymaps3.search({
    text: val,
    bounds: map.value?.bounds,
  });

}
);
// save to local storage
function onSearchChange(event) {
  const selectedValue = event.target.value;
  const selectedCoordinates = selectedValue.split(',');

  const selectedAddress = {
    id: Date.now() + Math.random().toString(36).substr(2, 9),
    coordinates: selectedCoordinates,
    address: searchResponse.value.find(item => item.geometry?.coordinates.join(',') === selectedValue)?.properties.name || ''
  };

  let currentStreets = JSON.parse(localStorage.getItem('streets')) || [];

  currentStreets.push(selectedAddress);

  localStorage.setItem('streets', JSON.stringify(currentStreets));
  search.value = '';
  hideDropdown();
  loadList();
}


// search box hide and seek
async function hideDropdown(){
  await sleep(100);
  let list = document.getElementById('search');
  list.style.display="none";
}
function showDropdown(){
  let list = document.getElementById('search');
  list.style.display="";
}


//////////////////////////////////Создание и обновление списка////////////////////////////////
interface StreetItemInterface {
  id: string;
  address: string;
}

let streets = ref<StreetItemInterface[]>([]);
let isEmptyList = ref(true);

// list update
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

// list position delete
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

onMounted(loadList);

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
  display: flex;
  grid-template-columns: repeat(1, 96%);
  justify-content: space-between;

    input {
      padding: 10px;
      border-radius: 5px;
      color: var(--vp-button-alt-text);
      background: var(--vp-button-alt-bg);
    }
}

dropdown-list {
  display: list-item;
  max-width: 560px;
  position: absolute;
  z-index: 99;
}

dropdown-list>#search.col-9::marker {
  display: none;
}
option {
  display: flex;
  flex-wrap: wrap;
  text-wrap: wrap;
  background-color: aliceblue;
  color: black;
  width: 100%;
  padding: 0.3em;
}

option:hover {
  background-color: #0056b3;
}

</style>