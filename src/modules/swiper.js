
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export const swiper = () => {

        const swiper = new Swiper('.services-elements', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            modules : [Navigation],
            navigation: {
                nextEl: '.arrow-right',
                prevEl: '.arrow-left',
            },
            breakpoints: {
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                }
            }
        })
    


}