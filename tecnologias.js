const images = document.querySelectorAll('#image');
const divContainerImages = document.querySelectorAll('.rounded');

// Função para obter as duas cores predominantes de uma imagem
function getDominantColors(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Ajustar o tamanho do canvas ao tamanho da imagem
  canvas.width = image.width;
  canvas.height = image.height;

  // Desenhar a imagem no canvas
  ctx.drawImage(image, 0, 0);

  // Obter os dados de pixel da imagem
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Dicionário para armazenar a contagem de cada cor
  const colorCount = {};

  // Iterar por cada pixel
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];     // Red
    const g = data[i + 1]; // Green
    const b = data[i + 2]; // Blue
    const a = data[i + 3]; // Alpha (transparência)

    // Ignorar pixels transparentes
    if (a < 255) continue;

    // Criar um identificador único para a cor no formato 'r,g,b'
    const rgb = `${r},${g},${b}, 0.2`;

    // Incrementar a contagem da cor
    colorCount[rgb] = (colorCount[rgb] || 0) + 1;
  }

  // Ordenar as cores pela contagem, do mais frequente ao menos frequente
  const sortedColors = Object.entries(colorCount).sort((a, b) => b[1] - a[1]);

  // Retornar as duas cores mais frequentes
  const dominantColors = sortedColors.slice(0, 2).map(color => color[0]); // Pegar os dois primeiros

  return dominantColors;
}

// Iterar sobre todas as imagens e containers
images.forEach((image, index) => {
  image.onload = () => {
    const dominantColors = getDominantColors(image);
    
    // Exibir no console as cores predominantes
    console.log(`As cores predominantes da imagem ${index + 1} são: rgb(${dominantColors.join('}) e rgb(')})`);

    // Aplicar as cores ao container correspondente
    if (divContainerImages[index]) {
      // Verifica se não há cores predominantes
      if (dominantColors.length === 0) {
        // Se não houver cores, aplicar branco
        divContainerImages[index].style.backgroundColor = 'rgb(255,255,255, 0.3)';
      } else {
        // Verifica se a primeira cor é preta
        const firstColor = dominantColors[0].split(',').slice(0, 3).join(',');
        if (firstColor === '0,0,0') {
          // Se a cor for preta, aplicar branco
          divContainerImages[index].style.backgroundColor = 'rgb(255,255,255, 0.3)';
        } else {
          if (dominantColors.length === 1) {
            // Se houver apenas uma cor, aplicar como fundo sólido
            divContainerImages[index].style.backgroundColor = `rgb(${dominantColors[0]})`;
          } else {
            // Se houver duas cores, aplicar como gradiente
            divContainerImages[index].style.background = `linear-gradient(to left, rgb(${dominantColors[0]}), rgb(${dominantColors[1]}))`;
          }
        }
      }
    }
  };

  // Garantir que a função seja chamada para imagens já carregadas (caso o evento 'onload' tenha passado)
  if (image.complete) {
    image.onload();
  }
});
