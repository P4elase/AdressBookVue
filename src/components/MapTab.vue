<template>
  <yandex-map v-model="map" :settings="{
    location: {
      center: [43.958455, 56.326036],
      zoom: 10,
    },
  }" width="100%" height="500px">
    <yandex-map-default-scheme-layer />
  </yandex-map>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';

//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null);

</script>

<style></style>