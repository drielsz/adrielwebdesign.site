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


const URL = 'https://websiteadr-backend-production.up.railway.app'
function curtirPost (postId) {
  fetch(`${URL}/curtir`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_id: postId }),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Dados recebidos do backend:", data);
      if (data.message) {
        console.log(data.message);
      }
      // Atualiza o contador de curtidas no HTML
      const curtidasElement = document.getElementById(`curtidas-${postId}`);
      let currentCount = parseInt(curtidasElement.textContent) || 0;
      curtidasElement.textContent = currentCount + 1;  // Incrementa a contagem
    })
    .catch(err => {
      console.error("Erro:", err);
    });
};
const obterCurtidasPorPost = () => {
  fetch(`${URL}/curtidas`)
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        // Atualiza o elemento que mostra as curtidas de cada post
        const curtidasElement = document.querySelector(`#curtidas-${item.post_id}`);
        if (curtidasElement) {
          curtidasElement.textContent = `${item.totalCurtidas}`;
        }
      });
    })
    .catch(err => {
      console.error("Erro ao obter contagem de curtidas:", err);
    });
};
// Chame essa função ao carregar a página
obterCurtidasPorPost();