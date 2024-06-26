let storyText = `Это история человека по имени Стэнли.
Стэнли работал в большой компании на должности сотрудника номер 427.
Работа у сотрудника 427 была простой.
Он сидел за своим столом в комнате 427 и нажимал кнопки.
Инструкции приходили к нему на экран.
Они указывали ему, какие кнопки нажимать, как долго и в каком порядке.
Сотрудник 427 делал это день за днём, год за годом.
И хотя кто-то может сказать, что такая работа вытягивает душу,
Стэнли был рад каждой новой инструкции и чувствовал, что он создан для этой работы.
Стэнли был счастлив.`;

let KonamiKode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"];
let nextKey = 0;
let buttonsContainer = document.getElementById('org_div4');

document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
    }
    if (e.key == KonamiKode[nextKey]) {
        nextKey++;
        if (nextKey == KonamiKode.length) {
            nextKey = 0;
            alert("Konami Code? Вы сами до этого додумались? Перебрали все комбинации и последовательности клавиш? Считерили и заглянули в исходники?");
            alert("Ну это уже неважно. Что ж, любитель нажимать на кнопочки, сейчас я расскажу тебе одну поучительную историю.");
            DoFullScreen(document.documentElement);
            document.querySelector('body').innerHTML = '';
            document.querySelector('body').innerHTML = '<div class="image-container"><img src="src/img/end.png" alt="..."><div class="text-overlay"></div></div>';
            setTimeout(function () {
                displayText(storyText);
            }, 2000);
        } else {
            let button = document.createElement('div');
            button.className = 'k-button';
            buttonsContainer.appendChild(button);
        }
    } else {
        buttonsContainer.innerHTML = '';
        nextKey = 0;
    }
});

function DoFullScreen(el) {
    if (isFullScreen()) return false;
    if (el === undefined) el = document.documentElement;
    if (document.fullscreenEnabled) {
        el.requestFullscreen();
    } else if (document.webkitFullscreenEnabled) {
        el.webkitRequestFullscreen();
    } else if (document.mozFullScreenEnabled) {
        el.mozRequestFullScreen();
    } else if (document.msFullscreenEnabled) {
        el.msRequestFullscreen();
    }
}

function isFullScreen() {
    return Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayText(text) {
    let textOverlay = document.querySelector('.text-overlay');
    textOverlay.style.display = 'flex'; // Показываем контейнер текста
    let lines = text.split('\n'); // Разделяем текст на строки
    for (let line of lines) {
        for (let char of line) {
            textOverlay.textContent += char;
            await sleep(40); // Задержка между символами
        }
        textOverlay.textContent += '\n';
        await sleep(700);
    }
    textOverlay.textContent = '';
    await sleep(1000);
    textOverlay.textContent = 'А Вы счастливы?';
    await sleep(2000);
    textOverlay.textContent = '';
    await sleep(1000);
    textOverlay.textContent = 'Вы довольны тем, чего добились?';
    await sleep(2000);
    textOverlay.textContent = '';
    await sleep(5000);
    location.reload();
}

window.addEventListener("keydown", (event) => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return;
    }

    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "F1":
            event.preventDefault();
            alert('Забавный факт- настоящее название JS это ECMAScript-JS.');
            break;
        case "F4":
            event.preventDefault();
            alert('Забавный факт- нажмите эту кнопку вместе с клавишей Alt и увидите мультик.');
            break;
        case "F7":
            event.preventDefault();
            alert('Забавный факт- больше 40 коммитов в основной ветке было сделано только из-за несовершенства сред разработки под Android.');
            break;
        case "F9":
            event.preventDefault();
            alert('Забавный факт- на написание этой простенькой странички разработчику потребовалось 2 недели, 4 энергетика и одна игра в стиме.');
            break;
            case "F10":
                event.preventDefault();
                alert("Мультик все-таки будет)")
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                break;
        case "F12":
            event.preventDefault();
            alert('Зачем Вы это делаете, мистер Андерсон, зачем пытаетесь выйти за рамки дозволенного?');
            break;
        case "Escape":
            event.preventDefault();
            alert('Все закончится только когда все закончится.');
            break;
        default:
            return;
    }
    document.getElementsByName("body").focus();
    event.preventDefault();
}, true);

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});