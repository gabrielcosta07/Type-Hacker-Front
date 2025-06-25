const subContainer = document.querySelector('.sub-container');
const input = document.querySelector('.input');
const elementoPontos = document.getElementById('pontos');
const palavras = [
  "protocolo",
  "firewall",
  "algoritmo",
  "servidor",
  "backdoor",
  "malware",
  "encriptar",
  "kernel",
  "rootkit",
  "exploit"
];
let elementoPalavraAtual;
let intervaloQueda;
let velocidade;
let erros;
let pontuacao;
let sequenciaAcertos;

function iniciarJogo() {
    const staticWord = document.querySelector('.palavra-atual');
    if (staticWord) staticWord.remove();
    
    pontuacao = 0;
    sequenciaAcertos = 0;
    elementoPontos.textContent = pontuacao;

    input.addEventListener('keydown', verificarEnter);
    proximaRodada();
}

function proximaRodada() {
    if (elementoPalavraAtual) {
        elementoPalavraAtual.remove();
    }

    input.value = '';
    input.disabled = false;
    input.focus();
    velocidade = 1;
    erros = 0;
    
    const textoPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    elementoPalavraAtual = document.createElement("div");
    elementoPalavraAtual.classList.add("palavra-atual");
    elementoPalavraAtual.textContent = textoPalavra;
    elementoPalavraAtual.style.color = "white";
    subContainer.appendChild(elementoPalavraAtual);

    iniciarQueda();
}

function iniciarQueda() {
    let posicaoVertical = 0;
    clearInterval(intervaloQueda);

    intervaloQueda = setInterval(() => {
        posicaoVertical += velocidade;
        elementoPalavraAtual.style.top = posicaoVertical + 'px';

        if (posicaoVertical > window.innerHeight) {
            clearInterval(intervaloQueda);
            tratarErro();
        }
    }, 50);
}

function verificarEnter(event) {
    if (event.key !== 'Enter' || !elementoPalavraAtual) return;
    event.preventDefault();

    if (input.value.toLowerCase() === elementoPalavraAtual.textContent.toLowerCase()) {
        tratarAcerto();
    } else {
        tratarErro();
    }
}

function tratarAcerto() {
    sequenciaAcertos++;
    const pontosGanhos = 10 + sequenciaAcertos;
    pontuacao += pontosGanhos;
    elementoPontos.textContent = pontuacao;

    clearInterval(intervaloQueda);
    elementoPalavraAtual.style.color = "green";
    
    elementoPalavraAtual.classList.add('shake-animation');
    input.classList.add('shake2-animation');

    setTimeout(() => {
        input.classList.remove('shake2-animation');
        proximaRodada();
    }, 500);
}

function tratarErro() {
    sequenciaAcertos = 0;
    erros++;
    velocidade += 0.5;
    input.value = "";
    
    if (elementoPalavraAtual) {
        elementoPalavraAtual.classList.add('shake-animation');
        setTimeout(() => elementoPalavraAtual.classList.remove('shake-animation'), 500);
    }
    
    if (erros >= 3) {
        fimDeJogo();
    }
}

function fimDeJogo() {
    clearInterval(intervaloQueda);
    input.disabled = true;
    if (elementoPalavraAtual) {
        elementoPalavraAtual.style.color = "red";
    }
}
(function travartela() {
window.addEventListener('keydown', (event) => {
    if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === '+' || event.key === '-' || event.key === '0')
    ) {
        event.preventDefault();
    }
});

window.addEventListener(
    'wheel',
    (event) => {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    },
    { passive: false }
);
})();

iniciarJogo();