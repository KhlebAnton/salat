// Функция для установки cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Функция для получения cookie
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Функция для удаления cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Функция для показа баннера куки
function showCookieBanner() {
    const cookieBanner = document.querySelector('.complex-cookies');
    if (cookieBanner) {
        cookieBanner.classList.add('is-visible');
    }
}

// Функция для скрытия баннера куки
function hideCookieBanner() {
    const cookieBanner = document.querySelector('.complex-cookies');
    if (cookieBanner) {
        cookieBanner.classList.remove('is-visible');
    }
}

// Функция инициализации куки-баннера
function initCookieBanner() {
    // Проверяем, принял ли пользователь куки
    const cookiesAccepted = getCookie('cookiesAccepted');
    
    if (!cookiesAccepted) {
        // Если куки не были приняты/отклонены, показываем баннер
        showCookieBanner();
    } else {
        // Если решение уже было принято, скрываем баннер
        hideCookieBanner();
    }
    
    // Обработчик для кнопки "Принять"
    const acceptBtn = document.querySelectorAll('.complex-cookies__btn .complex-btn')[0];
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            setCookie('cookiesAccepted', 'true', 365); // Сохраняем на 365 дней
            hideCookieBanner();
            console.log('Куки приняты');
        });
    }
    
    // Обработчик для кнопки "Отклонить"
    const rejectBtn = document.querySelectorAll('.complex-cookies__btn .complex-btn')[1];
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            setCookie('cookiesAccepted', 'false', 365); // Сохраняем решение на 365 дней
            hideCookieBanner();
            console.log('Куки отклонены');
        });
    }
}




// Функция инициализации видео
function initVideo() {
    const videoContainer = document.querySelector('.complex-video-container');
    if (!videoContainer) return;

    const video = videoContainer.querySelector('video');
    const playButton = videoContainer.querySelector('.complex-video-btn');

    if (!video || !playButton) return;

    // Обработчик клика на кнопку воспроизведения
    playButton.addEventListener('click', function() {
        video.play();
        video.setAttribute('controls', 'controls');
        playButton.style.opacity = '0';
        playButton.style.pointerEvents = 'none';
    });

    // Обработчик события паузы
    video.addEventListener('pause', function() {
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'all';
    });

    // Обработчик события воспроизведения
    video.addEventListener('play', function() {
        playButton.style.opacity = '0';
        playButton.style.pointerEvents = 'none';
    });

    // Обработчик события окончания видео
    video.addEventListener('ended', function() {
        video.removeAttribute('controls');
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'all';
    });
}

// Функция инициализации Swiper для отзывов
function initReviewsSwiper() {
    const reviewsSwiper = new Swiper('.complex-reviews-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: '.complex-reviews-swiper__nav-next',
            prevEl: '.complex-reviews-swiper__nav-prev',
        },
       
    });
}

// Функция валидации формы
function initFormValidation() {
    const form = document.querySelector('.complex-form');
    if (!form) return;

    const inputs = form.querySelectorAll('.complex-input');

    // Сохраняем оригинальные placeholder'ы
    const originalPlaceholders = new Map();
    inputs.forEach(input => {
        originalPlaceholders.set(input, input.placeholder);
    });

    // Функция для показа ошибки
    function showError(input) {
        input.classList.add('error');
        input.value = '';
        input.placeholder = 'Пожалуйста, заполните это поле!';
    }

    // Функция для очистки ошибки
    function clearError(input) {
        input.classList.remove('error');
        input.placeholder = originalPlaceholders.get(input);
    }

    // Обработчик фокуса для очистки ошибки
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            clearError(this);
        });
    });

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Проверяем все поля
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input);
                isValid = false;
            }
        });

        // Если все поля заполнены, отправляем форму
        if (isValid) {
            console.log('Форма валидна, отправка данных...');
            // Здесь можно добавить код для отправки данных
            // form.submit(); или отправка через AJAX
        }
    });
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    initCookieBanner();
    initVideo();
    initReviewsSwiper();
    initFormValidation();
});

