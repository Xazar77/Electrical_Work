import { validInputs, validData, animate } from './helper'
import svg from '../images/spinner.svg'

export const form = () => {
    const form = document.querySelector('form')
    const modalOverlay = document.querySelector('.modal-overlay')
    const modalBlock = document.getElementById('callback')
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

       


        if(validData(form)) {

            sendData(formBody)
                .then(()=> {
                    statusImg.src = ''
                    statusBlock.textContent = successMessage
                    form.append(statusBlock)
                    form.querySelectorAll('input').forEach(input => input.style.border = '')
                    form.reset()
                    animate({
                        duration: 2500,
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
                    }, 3000)
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
}