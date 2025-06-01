//Corpo do Jogo

// A variável `listaDePalavras` é criada e passada pelo PHP no ficheiro HTML
// antes deste script ser carregado.

// 1. ESCOLHE A PALAVRA ALEATÓRIA
const indiceAleatorio = Math.floor(Math.random() * listaDePalavras.length);
const palavraAleatoria = listaDePalavras[indiceAleatorio];

// 2. SELECIONA OS ELEMENTOS E CONFIGURAÇÕES
const elementoPalavra = document.getElementById('palavraAnimada');
const campoInput = document.getElementById('campoControle');
const velocidade = parseInt(elementoPalavra.dataset.velocidade) || 2;
let posicaoVertical = 0;

// 3. DEFINE A PALAVRA NO TÍTULO PARA O JOGO COMEÇAR
elementoPalavra.innerText = palavraAleatoria.toUpperCase();


// 4. CRIAR O INTERVALO PARA MOVER A PALAVRA
const intervalo = setInterval(() => {
    posicaoVertical += velocidade;
    elementoPalavra.style.top = posicaoVertical + 'px';

    // Condição de fim de jogo se a palavra chegar ao fundo
    if (posicaoVertical > window.innerHeight) {
        elementoPalavra.style.display = 'none';
        clearInterval(intervalo);
    }
}, 50);

// 5. OUVINTE PARA O CAMPO DE TEXTO
campoInput.addEventListener('input', () => {
   // A condição de vitória agora usa a nossa variável `palavraAleatoria`
   if (campoInput.value.toLowerCase() === palavraAleatoria.toLowerCase()) {
        clearInterval(intervalo); // Para a palavra
        elementoPalavra.style.color = '#7CFC00'; // Muda a cor para verde-limão (sucesso)
        campoInput.disabled = true; // Desativa o campo de texto
    }
});


//Nao deixar jogador roubar
window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
});
window.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });