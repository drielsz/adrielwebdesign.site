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