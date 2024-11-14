const magnets = document.querySelectorAll(".magnetic")
const buttonScrollToTop = document.querySelector(".scrollToTop")

document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const children = main.children;

    Array.from(children).forEach((child, index) => {
        child.style.animation = `
            fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards, 
            slide-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s forwards
        `;
    });

    main.classList.remove("hidden");
});

magnets.forEach((magnet) => {
    if (window.innerWidth > 540) {
        magnet.addEventListener("mousemove", function (e) {
            const position = magnet.getBoundingClientRect();
            const x = e.pageX - window.scrollX - position.left - position.width / 2;
            const y = e.pageY - window.scrollY - position.top - position.height / 2;
            console.log(x, y)
            magnet.style.transform = "translate(" + x * 0.3 + "px, " + y * 0.5 + "px)";
            magnet.style.transition = "all 0s linear";
        });

        magnet.addEventListener("mouseleave", function (e) {
            magnet.style.transition = "all 0.2s cubic-bezier(0, 0, 0.72, 0.21)"
            magnet.style.transform = "translate(0px, 0px)"
        })
    }
})


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