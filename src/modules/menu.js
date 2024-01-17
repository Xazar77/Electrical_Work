
export const menu = () => {
    const menu = document.querySelector('.top-menu')
    const menuItems = menu.querySelectorAll('ul>li')
    const btnToTop = document.querySelector('.up')


    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            const id = e.target.getAttribute('href').substring(1)
            document.getElementById(id).scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            })

        })
    })

    btnToTop.addEventListener('click', () => {
                
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    })
    window.addEventListener('scroll', () => {

       if(document.documentElement.scrollTop < 400) {
             btnToTop.style.display = 'none'
       }else {
            btnToTop.style.display = 'block'
        }
    })



} 