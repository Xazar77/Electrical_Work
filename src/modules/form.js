import { validInputs, validData, openModal, closeModal } from './helper'
import svg from '../images/spinner.svg'

export const form = (selectors = []) => {
    const modalOverlay = document.querySelector('.modal-overlay')
    const modalResponseMessage = document.getElementById('responseMessage')
    const btnResClose = modalResponseMessage.querySelector('.fancyClose')
    // console.log(modalOverlay)

    selectors.forEach(selector => {

        const modal = document.getElementById(selector)   
        const form = modal.querySelector('form')
        
        const statusBlock = document.createElement('div')
        const statusImg = document.createElement('img')
    
        const loadedMessage = svg
        const infoMessage = 'Заполните все поля!'
        const errorMessage = 'Ошибка загрузки данных ...'
        const successMessage = 'Спасибо! Наш менеджер скоро свяжется с вами!!!!'
        
        statusBlock.style.cssText = `
            color : green;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        `
            
        statusImg.style.cssText = `
            color: red;
            display: block;
            margin: 0 auto;
            text-align:center;
    `;
        statusBlock.insertAdjacentHTML('beforeend', `<img src=${svg} alt=${svg}`)
        form.append(statusBlock)
    
        validInputs(form)

        const showResponsModal = () => {  
            setTimeout(() => {
                openModal(modalResponseMessage, modalOverlay)
                statusBlock.textContent = successMessage
                modalResponseMessage.append(statusBlock)

            },1100)
            btnResClose.addEventListener('click', (e) => {
                e.preventDefault()
                closeModal(modalResponseMessage, modalOverlay)
          
                statusBlock.textContent = ''
            })
        }
    
        const sendData = (data) => {
            return fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            
        }   
        const sendForm = (form) => {
            
    
           
            
            const formData = new FormData(form)
            const formBody = {}
    
    
            statusImg.src = loadedMessage
            form.append(statusImg)
    
    
    
           
            formData.forEach((input, key) => {
                formBody[key] = input
    
            })
    
           
            validData(form)
    
            if(validData(form)) {
    
                sendData(formBody)
                    .then(()=> {
                        statusImg.src = ''
                        // statusBlock.textContent = successMessage
                        form.append(statusBlock)
                        form.querySelectorAll('input').forEach(input => input.style.border = '')
                        form.reset()
                        closeModal(modal, modalOverlay)
                       
                        showResponsModal()

                   
                        
                    }).catch(error => {
                        console.error(error.message)
                        statusImg.src = ''
                        statusBlock.textContent = errorMessage
                    })
            } else {
                statusImg.src = ''
                statusBlock.textContent = infoMessage
            }
        }
        
    
        try{
    
            form.addEventListener('submit', (e) => {
                e.preventDefault()
                sendForm(form)
                
        
            })
        }catch {
            throw new Error(error.message)
        }
    })
}