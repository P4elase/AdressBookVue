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

    <yandex-map-default-marker v-for="marker in markers" :key="marker.title" :settings="marker" />

  </yandex-map>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue';
import { LngLat, YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker, YandexMapZoomControl, YandexMapControls, YandexMapDefaultMarker, YandexMapGeolocationControl, YandexMapControlButton } from 'vue-yandex-maps';


//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null);

//markers test
const timedCounter = ref(1);

const markers = [
  {
    coordinates: [43.929114, 56.328619] as LngLat,
    color: '#01BBEA',
    title: 'Поликлиника №19',
    subtitle: `Гордеевская 40`,
  },
];

const isFullscreen = ref(false);

const toggleFullscreen = () => {
  // The document.fullscreenElement returns the Element that is currently being presented in fullscreen mode in this document, or null if fullscreen mode is not currently in use
  if (isFullscreen.value) {
    // The document.exitFullscreen() requests that the element on this document which is currently being presented in fullscreen mode be taken out of fullscreen mode
    document.exitFullscreen();
  } else {
    // The element.requestFullscreen() method issues an asynchronous request to make the element be displayed in fullscreen mode
    map.value!.container.requestFullscreen();
  }
};

onMounted(() => {
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