

export const accordeon = () => {
    const accordeonBlock = document.querySelector('.accordeon')
    const elements = accordeonBlock.querySelectorAll('.element')
    const elementsContent = accordeonBlock.querySelectorAll('.element-content')

    


    elements.forEach((item, i) => {
        item.classList.remove("active")
        elementsContent[i].classList.remove("element-content-active")
        item.addEventListener("click", () => {
            const isItemOpen = item.classList.contains("active") && elementsContent[i].classList.contains("element-content-active");
          
            elements.forEach((elem, idx) => {
            elem.classList.remove("active")
            elementsContent[idx].classList.remove("element-content-active")
            });
            if (!isItemOpen) {
                item.classList.toggle("active");
                elementsContent[i].classList.toggle("element-content-active")
            }
        })
    });
}