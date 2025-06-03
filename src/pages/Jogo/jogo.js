const elementoPalavra = document.getElementsByClassName('palavra-atual')[0];
const input = document.getElementsByClassName('input')[0];

let posicaoVertical = 0;
let velocidade = 2;
let intervalo = null;

if (elementoPalavra) {
    intervalo = setInterval(() => {
        posicaoVertical += velocidade;
        elementoPalavra.style.top = posicaoVertical + 'px';

        if (posicaoVertical > window.innerHeight) {
            elementoPalavra.style.display = 'none';
            clearInterval(intervalo);
        }
    }, 50);

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (input.value.toLowerCase() === elementoPalavra.innerText.toLowerCase()) {
                clearInterval(intervalo);
                input.disabled = true;
                elementoPalavra.style.color = "green";
            } else {
                elementoPalavra.style.color = "red";
                input.value = "";
            }
        }
    });
}
//trava tela
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