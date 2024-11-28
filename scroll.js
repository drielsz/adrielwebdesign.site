const buttonScrollToTop = document.querySelector(".scrollToTop")

const appearMoment = 0.20172
window.addEventListener('scroll', (e) => {
    let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)

    if (scrollPercentage > appearMoment) {
        buttonScrollToTop.classList.add("active");
        buttonScrollToTop.classList.remove("hiddenScrollToTop");
    } else {
        buttonScrollToTop.classList.remove("active");
        buttonScrollToTop.classList.add("hiddenScrollToTop");
    }
    

})

buttonScrollToTop.addEventListener("click", (e) => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
})