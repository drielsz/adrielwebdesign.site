const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;
const main = document.querySelector("main");
const menuBarSession = document.querySelectorAll(".nav-menubar-session");
const navMenuBar = document.querySelectorAll(".nav-menubar");
const dropdownMenu = document.querySelector(".dropdown-div");
const dropdown = document.querySelector(".dropdown");
const boxes = document.querySelectorAll(".container-card-projetos");


hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");  
  navMenu.classList.toggle("active");
  body.classList.toggle('no-scroll');     
  main.classList.toggle('blur-main'); 
  menuBarSession.forEach(session => session.classList.toggle("active"));

  navMenuBar.forEach(session => session.classList.toggle("active"));
});

dropdown.addEventListener("click", () => {
  dropdownMenu.classList.toggle("active");
})

dropdownMenu.addEventListener("mouseleave", () => {
  dropdownMenu.classList.toggle("active");
})


// function checkBoxes() {
//   const triggerBottom = window.innerHeight / 5 * 4;
//   boxes.forEach((box, id) => {
//     const boxTop = box.getBoundingClientRect().top;
//     console.log(boxTop)
//     if(boxTop < triggerBottom) {
//       console.log('box<')
//       box.classList.toggle('show')
//     }
//   })
// }
// document.addEventListener("scroll", (event) => {

//   checkBoxes()
// })