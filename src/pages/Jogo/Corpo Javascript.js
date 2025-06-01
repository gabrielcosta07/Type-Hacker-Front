//Corpo do Jogo
const indiceAleatorio = Math.floor(Math.random() * listaDePalavras.length);
const palavraAleatoria = listaDePalavras[indiceAleatorio];
const elementoPalavra = document.getElementById('palavraAnimada');
const campoInput = document.getElementById('campoControle');
const velocidade = parseInt(elementoPalavra.dataset.velocidade) || 2;
let posicaoVertical = 0;

elementoPalavra.innerText = palavraAleatoria.toUpperCase();

const intervalo = setInterval(() => {
    posicaoVertical += velocidade;
    elementoPalavra.style.top = posicaoVertical + 'px';
    if (posicaoVertical > window.innerHeight) {
        elementoPalavra.style.display = 'none';
        clearInterval(intervalo);
    }
}, 50);
campoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        if (campoInput.value.toLowerCase() === palavraAleatoria.toLowerCase()){
            clearInterval(intervalo);
            elementoPalavra.style.color = '#48ff00'
              campoInput.disabled = true;
        } else {
            elementoPalavra.style.color = 'red'
            campoInput.value = '';
        }
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