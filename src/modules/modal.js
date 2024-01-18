import { openModal, closeModal } from "./helper"

export const modal = (selectors = []) => {
    const modalOverlay = document.querySelector('.modal-overlay')

    selectors.forEach(selector => {

        const modal = document.getElementById(selector)
    
        
        const hideModal= (elem, overlay) => {
            elem.style.display = 'none'
            elem.style.opacity = 0
            overlay.style.display = 'none'
            overlay.style.opacity = 0
    
        }
        hideModal(modal, modalOverlay)


    
        document.addEventListener('click', (e) => {
            if(e.target.closest('.swiper-slide')) {
                if(modal.getAttribute('id') === 'application') {
                    openModal(modal, modalOverlay)
                }
            } else if(e.target.closest('.callback-btn')) {
                if(modal.getAttribute('id') === 'callback') {
                    openModal(modal, modalOverlay)
                }
            } else if(e.target.closest('.button.button-services')) {
                if(modal.getAttribute('id') === 'feedback') {
                    openModal(modal, modalOverlay)
                }
            } else  if(e.target.closest('.modal-close') || e.target === modalOverlay) {
                closeModal(modal, modalOverlay)
        
            }
        })
        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape') {
                closeModal(modal, modalOverlay)
            }
        })

    })
}