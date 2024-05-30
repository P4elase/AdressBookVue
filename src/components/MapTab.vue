<template>
  <yandex-map v-model="map" :settings="{
    location: {
      center: [43.929114, 56.328619],
      zoom: 14,
    },
  }" width="100%" height="70vh">
    <yandex-map-default-scheme-layer />

    <yandex-map-default-features-layer />

    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-zoom-control />
    </yandex-map-controls>

    <yandex-map-controls :settings="{ position: 'left' }">
      <yandex-map-geolocation-control />
    </yandex-map-controls>

    <yandex-map-controls :settings="{ position: 'top right', orientation: 'vertical' }">
      <yandex-map-control-button :settings="{ onClick: toggleFullscreen }">
        <div class="fullscreen" :class="{ 'exit-fullscreen': isFullscreen }"></div>
      </yandex-map-control-button>
    </yandex-map-controls>

    <yandex-map-default-marker v-for="marker in markers" :key="marker.id" :settings="marker" />

    <yandex-map-default-marker v-for="marker in mainMarkers" :key="marker.title" :settings="marker" />

  </yandex-map>
  <br>
  <button @click="addMarkersToMap">Обновить маркеры на карте</button>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onBeforeUnmount} from 'vue';
import { LngLat, YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker, YandexMapZoomControl, YandexMapControls, YandexMapDefaultMarker, YandexMapGeolocationControl, YandexMapControlButton } from 'vue-yandex-maps';


const map = shallowRef<null | YMap>(null);
const markers = ref([]);
const timedCounter = ref(1);
const isFullscreen = ref(false);

// red markers on map
const mainMarkers = [
  {
    coordinates: [43.929114, 56.328619] as LngLat,
    color: 'red',
    title: 'Поликлиника №19',
    subtitle: `Гордеевская 40`,
  },
  {
    coordinates: [43.929427, 56.337075] as LngLat,
    color: 'red',
    title: 'Поликлиника №19',
    subtitle: `Есенина 46А`,
  },
  {
    coordinates: [43.935577, 56.313545] as LngLat,
    color: 'red',
    title: 'Поликлиника №19',
    subtitle: `Чкалова 41`,
  },
];

// load json and seek on map
function addMarkersToMap() {
  const storedData = JSON.parse(localStorage.getItem('streets') || '[]');

  markers.value = [];

  storedData.forEach(item => {
    const addressParts = item.address.split('подъезд');

    if (addressParts.length > 1) {
      let title = addressParts[0].trim();

      if (title.startsWith('улица')) {
        title = title.replace(/^улица\s+/, '').trim();
      }

      title = title.replace(/улица,/gi, '');

      const markerSettings = {
        coordinates: item.coordinates.map(coord => parseFloat(coord)),
        title: title,
        subtitle: `подъезд ${addressParts[1]}`.trim(),
        color: '#01BBEA',
      };

      markers.value.push(markerSettings);
    } else {
      const markerSettings = {
        coordinates: item.coordinates.map(coord => parseFloat(coord)),
        title: item.address.trim().replace(/улица/gi, ''),
        subtitle: '',
        color: '#01BBEA',
      };

      markers.value.push(markerSettings);
    }
  });
}

const toggleFullscreen = () => {

  if (isFullscreen.value) {

    document.exitFullscreen();
  } else {

    map.value!.container.requestFullscreen();
  }
};

onMounted(() => {

  if (localStorage.getItem('streets')) {
    addMarkersToMap();
  }

  const handleFullscreenChange = async () => {
    isFullscreen.value = !!document.fullscreenElement;
  };

  document.addEventListener('fullscreenchange', handleFullscreenChange);

  const interval = setInterval(() => {
    timedCounter.value++;
    if (timedCounter.value > 99) timedCounter.value = 0;
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(interval);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  });
});

</script>


<style scoped>
.pin {
  cursor: pointer;
  max-width: unset;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.fullscreen {
  width: 26px;
  height: 26px;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cg fill='%236B6B6B'%3E%3Cpath d='M16.14 7.86L14.27 6H20v5.7l-1.83-1.82L15.04 13 13 10.98l3.13-3.13zm0 0M9.86 18.14L11.73 20H6v-5.7l1.83 1.82L10.96 13 13 15.02l-3.13 3.13zm0 0'/%3E%3C/g%3E%3C/svg%3E");
}

.exit-fullscreen {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cg fill='%236B6B6B'%3E%3Cpath d='M8.14 15.86L6.27 14H12v5.7l-1.83-1.83-3.13 3.14L5 18.98l3.13-3.13zm0 0M17.86 10.14L19.73 12H14V6.3l1.83 1.83 3.13-3.14L21 7.02l-3.13 3.13zm0 0'/%3E%3C/g%3E%3C/svg%3E");
}
</style>