
function onSearch() {
    const searchInput = document.querySelector("#search");
    const filter = searchInput.value.toUpperCase();
    const lists = document.querySelectorAll('.list'); // Seleciona cada seção
  
    lists.forEach((section) => {
      const items = section.querySelectorAll('li');
      let hasVisibleItems = false;
  
      items.forEach((item) => {
        const text = item.textContent.toUpperCase();
        if (text.includes(filter)) {
          item.style.display = ""; // Mostra o item
          hasVisibleItems = true; // Marca que há pelo menos um item visível
        } else {
          item.style.display = "none"; // Esconde o item
        }
      });
  
      const cardProjeto = document.querySelector('.card-projetos');
  
      if (cardProjeto) { // Verifica se cardProjeto existe
        cardProjeto.style.justifyContent = 'flex-start';
        cardProjeto.style.gap = '0'
      }
      // Esconde o <h2> se não houver itens visíveis
      const heading = section.querySelector('h2') || section.querySelector('h1');
      if (heading) {
        heading.style.display = hasVisibleItems ? "" : "none";
      }
    });
  }
  
  document.querySelector("#search").addEventListener("input", onSearch);