// Exemplo de script para carregar as frases e vincular o clique para exibir o verso

// Função para carregar as frases do arquivo JSON e exibir na página
async function carregarFrases() {
    try {
      const resposta = await fetch('data/frases.json');
      const data = await resposta.json();
      
      // Seleciona o número de frases e o tema baseados nos parâmetros (na implementação real)
      const numeroFrases = 3; // Valor fixo para exemplo; substituir pela captura dos parâmetros da URL
      const tema = 'fe'; // Valor fixo para exemplo
      
      // Filtrar as frases de acordo com o tema
      const frasesFiltradas = data.frases.filter(item => item.tema === tema);
      
      // Seleciona frases aleatoriamente
      const frasesAleatorias = [];
      while (frasesAleatorias.length < numeroFrases && frasesFiltradas.length) {
        const indice = Math.floor(Math.random() * frasesFiltradas.length);
        frasesAleatorias.push(frasesFiltradas.splice(indice, 1)[0]);
      }
      
      const container = document.getElementById('frases');
      frasesAleatorias.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'card mb-3';
        div.innerHTML = `
          <div class="card-body" data-verso="${item.verso}">
            <p class="card-text">${item.frase}</p>
          </div>
        `;
        // Ao clicar na frase, exibe o verso no modal
        div.addEventListener('click', () => {
          // Fecha qualquer modal aberto caso necessário e exibe o verso da frase selecionada
          document.getElementById('versoConteudo').textContent = item.verso;
          const versoModal = new bootstrap.Modal(document.getElementById('versoModal'));
          versoModal.show();
        });
        container.appendChild(div);
      });
      
    } catch (error) {
      console.error('Erro ao carregar as frases:', error);
    }
  }
  
  // Chama a função para carregar as frases ao carregar a página
  document.addEventListener('DOMContentLoaded', carregarFrases);