import { animate } from "./helper"

export const modal = () => {
    const modalBtn = document.querySelector('.header > .callback-btn')
    const modalOverlay = document.querySelector('.modal-overlay')
    const modalBlock = document.getElementById('callback')
    
    
    modalBlock.style.display = 'none'
    modalBlock.style.opacity = 0
    modalOverlay.style.display = 'none'
    modalOverlay.style.opacity = 0

    const openModal = () => {
        modalBlock.style.display = 'block'
        modalOverlay.style.display = 'block'
        animate({
            duration: 1000,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
                modalBlock.style.opacity = progress ;
                modalOverlay.style.opacity = progress ;
            }
          });

    }

    const closeModal = () => {

        animate({
            duration: 1000,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                modalBlock.style.opacity = 1 - progress ;
                modalOverlay.style.opacity = 1 - progress ;
            }
        });
        setTimeout(() => {
            modalBlock.style.display = ''
            modalOverlay.style.display = ''
        }, 1050)
    }

    modalBtn.addEventListener('click', (e) => {
        e.preventDefault()
        openModal()
    })
    document.addEventListener('click', (e) => {
        if(e.target.closest('.swiper-slide') || e.target.closest('.button.button-services')) {
            openModal()
        } else  if(e.target.closest('.modal-close') || e.target === modalOverlay) {
            closeModal()
        }
    })
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape') {
            closeModal()
        }
    })
}