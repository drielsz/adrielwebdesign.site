const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;
const main = document.querySelector("main");
const menuBarSession = document.querySelectorAll(".nav-menubar-session");
const navMenuBar = document.querySelectorAll(".nav-menubar");

hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");  // Alterna a classe 'active' no botão hamburguer
  navMenu.classList.toggle("active");     // Alterna a classe 'active' no menu de navegação
  body.classList.toggle('no-scroll');     // Alterna a classe que remove a rolagem do body
  main.classList.toggle('blur-main');     // Alterna o desfoque no main

  // Alterna a classe 'active' para cada sessão do menuBarSession
  menuBarSession.forEach(session => session.classList.toggle("active"));

  // Alterna a classe 'active' para cada navMenuBar
  navMenuBar.forEach(session => session.classList.toggle("active"));
});


var OnOFF = document.getElementsByClassName("on-off")[0];
var GlowEmotion = document.querySelector("body > main > div.block-content > div > div > div > span");

fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(data => {
    if (data.status === 1) {
      OnOFF.classList.add("on");
      GlowEmotion.classList.add("glow");
    } else {
      OnOFF.classList.add("off");
      GlowEmotion.classList.remove("glow");
    }
  })
  .catch(error => console.error(error));
