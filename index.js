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
function curtirPost(postId) {
  fetch(`${URL}/curtir`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_id: postId }),
  })
    .then(response => response.json())
    .then(data => {
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


const SelectThemeButtons = document.querySelectorAll('.select-theme');
const divSelectThemes = document.querySelector('.select-themes')

SelectThemeButtons.forEach((selectbutton) => {
  const appearIconsSelect = document.querySelectorAll('.appear-icon-select');
  const hiddenIconSelect = document.querySelectorAll('.hidden-icon-select')
  selectbutton.addEventListener("click", () => {

    divSelectThemes.classList.toggle("active")

  });
});

const themeDark = document.querySelectorAll('.theme-dark');
const themeWhite = document.querySelectorAll('.theme-white');

const moonIcon = document.querySelectorAll('.moon-icon');
const sunIcon = document.querySelectorAll('.sun-icon')

function animateView() {
  body.classList.add("animating");
  setTimeout(() => {
    body.classList.remove('animating')
  }, 500)
}

function setTheme(theme) {
  const oppositeTheme = theme === 'white' ? 'dark' : 'white'

  body.classList.remove(oppositeTheme);
  body.classList.add(theme)

  localStorage.setItem('theme', theme)
}

function updateIcons(theme) {
  if (theme === 'white') {
    sunIcon.forEach((sunicon) => {
      sunicon.classList.remove('active')
    })
    moonIcon.forEach((moonicon) => {
      moonicon.classList.add('active')
    })
  }
  else {
    moonIcon.forEach((moonicon) => {
      moonicon.classList.remove('active')
    })
    sunIcon.forEach((sunicon) => {
      sunicon.classList.add('active')
    })
  }
}

function addIconAnimation(icon) {
  icon.classList.add('animateVerticalSlideIcon')
}

function checkCurrentTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  setTheme(savedTheme)
  updateIcons(savedTheme)
}

function applyTheme(theme) {
  body.classList.remove('dark', 'white');
  body.classList.add(theme);
}

function updateThemeIcons(theme) {
  moonIcon.forEach((moonicon) => {
    if(theme === 'dark'){
      moonicon.classList.remove('active')
    }else {
      moonicon.classList.add('active')
    }
  })
  sunIcon.forEach((sunicon) => {
    if(theme === 'white'){
      sunicon.classList.remove('active')
    }
    else {
      sunicon.classList.add('active')
    }
  })
}

function updateSelectedTheme(theme) {
  themeDark.forEach((themedark) => {
    if (theme === 'dark') {
      themedark.classList.add('selected-theme');
    } else {
      themedark.classList.remove('selected-theme');
    }
  });

  themeWhite.forEach((themewhite) => {
    if (theme === 'white') {
      themewhite.classList.add('selected-theme');
    } else {
      themewhite.classList.remove('selected-theme');
    }
  });
}


themeWhite.forEach((themewhite) => {
  themewhite.addEventListener('click', () => {
    themeDark.forEach((themedark) => {
      themedark.classList.remove('selected-theme')
    })
    themewhite.classList.add('selected-theme')
    setTheme('white');
    updateIcons('white');
    moonIcon.forEach((moonicon) => {addIconAnimation(moonicon)})
    animateView();
  })
})

themeDark.forEach((themedark) => {
  themedark.addEventListener('click', () => {
    themedark.classList.add('selected-theme')
    themeWhite.forEach((themewhite) => {
      themewhite.classList.remove('selected-theme')
    })
    setTheme('dark');
    updateIcons('dark');
    sunIcon.forEach((sunicon) => {addIconAnimation(sunicon)})
    animateView();
  })
})


checkCurrentTheme()

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark'; // Default para 'white'
  applyTheme(savedTheme);
  updateSelectedTheme(savedTheme);
  updateThemeIcons(savedTheme);
})