

export const slides =() => {
    const slidesBlock = document.querySelector('.top-slider')
    const slides = slidesBlock.querySelectorAll('.item')
    
    let countSlide = 0
    let interval

    const nextSlide = () => {
        slides[countSlide].classList.remove('item-active')
        countSlide++

        if(countSlide >= slides.length) {
            countSlide = 0
        }
        slides[countSlide].classList.add('item-active')
    }

    interval = setInterval(nextSlide, 3000)
}