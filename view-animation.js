
document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main")
    const children = main.children;

    Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${index * 0.05}s`;
        child.style.animationTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)";
        child.classList.add("animate");
    })
    main.classList.remove('hidden')
})