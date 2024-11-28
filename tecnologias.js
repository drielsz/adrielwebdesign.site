// Função para obter as cores dominantes de uma imagem
function getDominantColors(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Ajustar tamanho do canvas ao da imagem
  canvas.width = image.width;
  canvas.height = image.height;

  // Desenhar a imagem no canvas
  ctx.drawImage(image, 0, 0);

  // Obter dados dos pixels
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Contador de cores
  const colorCount = {};

  // Processar pixels
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = data.slice(i, i + 4);

    // Ignorar pixels transparentes
    if (a < 255) continue;

    const rgb = `${r},${g},${b}, 0.3`;
    colorCount[rgb] = (colorCount[rgb] || 0) + 1;
  }

  // Ordenar cores pelo número de ocorrências
  const sortedColors = Object.entries(colorCount).sort((a, b) => b[1] - a[1]);

  // Retornar as duas cores mais frequentes
  return sortedColors.slice(0, 2).map(([color]) => color);
}

// Função para aplicar as cores ao container
function applyColorsToContainer(container, colors) {
  const defaultColor = 'rgba(255,255,255,0.6)';
  const [firstColor, secondColor] = colors;

  // Aplicar branco se a primeira cor for preta ou se não houver cores
  if (!firstColor || firstColor === '0,0,0') {
    container.style.backgroundColor = defaultColor;
    return;
  }

  // Aplicar cor sólida ou gradiente
  if (!secondColor) {
    container.style.backgroundColor = `rgb(${firstColor})`;
  } else {
    container.style.background = `linear-gradient(to left, rgb(${firstColor}), rgb(${secondColor}))`;
  }
}

// Função principal para processar imagens e containers
function processImagesAndContainers(images, containers) {
  images.forEach((image, index) => {
    const container = containers[index];
    if (!container) return;

    const updateColors = () => {
      const dominantColors = getDominantColors(image);
      requestAnimationFrame(() => applyColorsToContainer(container, dominantColors));
    };

    // Atualizar cores quando a imagem carregar
    image.onload = updateColors;

    // Garantir atualização para imagens já carregadas
    if (image.complete) updateColors();
  });
}

// Selecionar imagens e containers
const images = document.querySelectorAll('#image');
const divContainerImages = document.querySelectorAll('.rounded');

// Executar a função principal
processImagesAndContainers(images, divContainerImages);
