const elementoPalavra = document.getElementsByClassName('palavra-atual')[0];
const input = document.getElementsByClassName('input')[0];

let posicaoVertical = 0;
let velocidade = 1;
let intervalo = null;
let morte = 0;

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
                elementoPalavra.classList.add('shake-animation');
                elementoPalavra.style.color = "green";

                setTimeout(() => {
                    elementoPalavra.classList.remove('shake-animation');
                }, 200);

            } else {

                elementoPalavra.style.color = "red";
                input.value = "";
                velocidade += 1;
                morte += 1;
                elementoPalavra.classList.add('shake-animation');
                
                    if (morte === 3) {
                        clearInterval(intervalo);
                        input.disabled = true;
                        elementoPalavra.style.color = "red";
                         setTimeout(() => {
                             elementoPalavra.classList.remove('shake-animation');
                        }, 200);
                    } else {
                        setTimeout(() => {
                            elementoPalavra.style.color = "white";
                            elementoPalavra.classList.remove('shake-animation');
                        }, 200);
                    }
            }
        }
    });
}

// trava tela
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