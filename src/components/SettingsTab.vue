<template>
    <h2>Введите адрес и дом</h2>
    <h4>* Форма внизу создает позицию в Вашем списке.</h4>
    <h4>* Для каждой позиции будет доступна кнопка <b>"Удалить"</b>, для защиты от случайного удаления необходимо
        <b>нажать по ней дважды</b>.
    </h4>
    <h4>* Переключатель <b>"Темный режим"</b> меняет тему оформления веб-страницы.</h4>
    <h4>* Кнопка <b>"Очистить весь список"</b> удаляет сразу все позиции в списке.</h4>
    <h4>* Приятного использования!</h4>
    <div id="org_div5">
        <h3>Темный режим</h3>

        <label class="switch">
            <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode">
            <span class="slider round"></span>
        </label>
    </div>
    <div class="install">
        <button id="install" hidden>Установить приложение</button>
    </div>
    <footer>
        <h5>All rights NOT reserved®</h5>
        <h5><a href="https://github.com/P4elase" target="_blank" rel="noopener noreferrer">GitHub@P4elase</a></h5>
        <br>
    </footer>

</template>

<script setup>
import { ref, onMounted } from 'vue';

let deferredPrompt;

const isDarkMode = ref(false);

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    let darkModeState = document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled';
    setCookie('darkMode', darkModeState, 365);
}

const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

onMounted(() => {
    let darkModeSetting = getCookie('darkMode');
    if (darkModeSetting === 'enabled') {
        document.body.classList.add('dark-mode');
        isDarkMode.value = true;
    }
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        document.getElementById('install').removeAttribute('hidden');
    });

    const installButton = document.getElementById('install');
    if (installButton) {
        installButton.addEventListener('click', (e) => {
            e.target.setAttribute('hidden', '');
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Пользователь принял запрос на установку PWA');
                } else {
                    console.log('Пользователь отклонил запрос на установку PWA');
                }
                deferredPrompt = null;
            });
        });
    }

    window.addEventListener('appinstalled', () => {
        document.getElementById('install').setAttribute('hidden', '');
    });
});
</script>

<style scoped>
/* Ваши стили здесь */
</style>