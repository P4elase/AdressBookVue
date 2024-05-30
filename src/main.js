import './assets/style.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createYmaps } from 'vue-yandex-maps';
import { VueYandexMaps } from 'vue-yandex-maps';
import * as bootstrap from 'bootstrap'


const app = createApp(App);

app.use(createYmaps({
    // use u own api key here
    apikey: '80906e04-81ae-4842-8f84-026ad4d31721',
}));

app.mount('#app')

// debug yamap
console.log(VueYandexMaps.settings.value)