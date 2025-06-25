import React from "react";
import { useNavigate } from "react-router-dom";
import "./jogo.css";

const PALAVRAS = [
  "protocolo",
  "firewall",
  "algoritmo",
  "servidor",
  "backdoor",
  "malware",
  "encriptar",
  "kernel",
  "rootkit",
  "exploit",
];

const ZeroDryGame = () => {
  const navigate = useNavigate();

  const [pontuacao, setPontuacao] = React.useState(0);
  const [erros, setErros] = React.useState(0);
  const [sequenciaAcertos, setSequenciaAcertos] = React.useState(0);
  const [palavraAtual, setPalavraAtual] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isShaking, setIsShaking] = React.useState(false);

  const [posicaoVertical, setPosicaoVertical] = React.useState(0);

  const inputRef = React.useRef(null);
  const gameContainerRef = React.useRef(null);

  const iniciarNovaPalavra = React.useCallback(() => {
    setIsShaking(false);
    setInputValue("");
    setPosicaoVertical(0);
    setPalavraAtual(PALAVRAS[(Math.random() * PALAVRAS.length) | 0]);
    inputRef.current?.focus();
  }, []);

  const reiniciarJogo = React.useCallback(() => {
    setPontuacao(0);
    setErros(0);
    setSequenciaAcertos(0);
    setIsGameOver(false);
    iniciarNovaPalavra();
  }, [iniciarNovaPalavra]);

  const fimDeJogo = () => {
    setIsGameOver(true);
  };

  const tratarErro = React.useCallback(() => {
    setSequenciaAcertos(0);
    const novosErros = erros + 1;
    setErros(novosErros);
    setInputValue("");

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    if (novosErros >= 3) {
      fimDeJogo();
    }
  }, [erros]);

  React.useEffect(() => {
    if (!palavraAtual || isGameOver) return;

    const gameHeight =
      gameContainerRef.current?.offsetHeight || window.innerHeight;
    const velocidade = 1 + erros;

    const intervaloQueda = setInterval(() => {
      setPosicaoVertical((prevPos) => {
        const novaPosicao = prevPos + velocidade;
        if (novaPosicao > gameHeight) {
          clearInterval(intervaloQueda);
          tratarErro();
          return prevPos;
        }
        return novaPosicao;
      });
    }, 50);

    return () => clearInterval(intervaloQueda);
  }, [palavraAtual, isGameOver, erros, tratarErro]);

  React.useEffect(() => {
    reiniciarJogo();
  }, [reiniciarJogo]);

  React.useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", preventZoom);
    window.addEventListener("wheel", preventZoom, { passive: false });

    return () => {
      window.removeEventListener("keydown", preventZoom);
      window.removeEventListener("wheel", preventZoom);
    };
  }, []);

  const handleInputChange = (event) => {
    if (!isGameOver) {
      setInputValue(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter" || !palavraAtual || isGameOver) return;
    event.preventDefault();

    if (inputValue.toLowerCase() === palavraAtual.toLowerCase()) {
      const pontosGanhos = 10 + sequenciaAcertos;
      setPontuacao((prev) => prev + pontosGanhos);
      setSequenciaAcertos((prev) => prev + 1);

      setIsShaking(true);
      setTimeout(() => {
        iniciarNovaPalavra();
      }, 500);
    } else {
      tratarErro();
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container-jogo" ref={gameContainerRef}>
        <div className="Esquerda">
          <div className="sub-container">
            <div
              className={`palavra-atual ${isShaking ? "shake-animation" : ""}`}
              style={{
                top: `${posicaoVertical}px`,
                color:
                  isShaking &&
                  inputValue.toLowerCase() === palavraAtual.toLowerCase()
                    ? "green"
                    : "white",
              }}
            >
              {palavraAtual}
            </div>
          </div>
          <div className="container-input">
            <input
              ref={inputRef}
              className="input"
              placeholder="Quebre o código!"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isGameOver}
              autoFocus
            />
          </div>
          <div className="timer"></div>
        </div>
        <div className="Direita">
          <div className="container-pontuacao">
            PONTUAÇÃO: <span id="pontos">{pontuacao}</span>
          </div>
        </div>
      </div>

      <div
        id="tela-game-over"
        style={{ display: isGameOver ? "flex" : "none" }}
      >
        <h1>GAME OVER</h1>
        <button id="botao-jogar-novamente" onClick={reiniciarJogo}>
          Jogar Novamente
        </button>
        <button onClick={goToHome}>Ir para Home</button>
      </div>
    </>
  );
};

export default ZeroDryGame;
