import './bootstrap';

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener('livewire:load', function () {
    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
