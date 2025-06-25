import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [pontuacao, setPontuacao] = useState(0);
  const [erros, setErros] = useState(0);
  const [sequenciaAcertos, setSequenciaAcertos] = useState(0);
  const [palavraAtual, setPalavraAtual] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [posicaoVertical, setPosicaoVertical] = useState(0);

  const inputRef = useRef(null);
  const gameContainerRef = useRef(null);

  const iniciarNovaPalavra = useCallback(() => {
    setIsShaking(false);
    setInputValue("");
    setPosicaoVertical(0);
    setPalavraAtual(PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)]);
    inputRef.current?.focus();
  }, []);

  const reiniciarJogo = useCallback(() => {
    setPontuacao(0);
    setErros(0);
    setSequenciaAcertos(0);
    setIsGameOver(false);
    iniciarNovaPalavra();
  }, [iniciarNovaPalavra]);

  const fimDeJogo = useCallback(() => {
    setIsGameOver(true);
  }, []);

  const tratarErro = useCallback(() => {
    setSequenciaAcertos(0);
    setErros((prevErros) => {
      const novosErros = prevErros + 1;
      if (novosErros >= 3) {
        fimDeJogo();
      }
      return novosErros;
    });
    setInputValue("");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, [fimDeJogo]);

  useEffect(() => {
    reiniciarJogo();
  }, [reiniciarJogo]);

  useEffect(() => {
    if (!palavraAtual || isGameOver) {
      return;
    }

    const velocidade = 1 + erros;
    const gameHeight =
      gameContainerRef.current?.offsetHeight || window.innerHeight;

    const intervaloQueda = setInterval(() => {
      setPosicaoVertical((pos) => {
        const novaPosicao = pos + velocidade;
        if (novaPosicao > gameHeight - 50) {
          clearInterval(intervaloQueda);
          tratarErro();
          return pos;
        }
        return novaPosicao;
      });
    }, 50);

    return () => clearInterval(intervaloQueda);
  }, [palavraAtual, isGameOver, erros, tratarErro]);

  useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };
    window.addEventListener("wheel", preventZoom, { passive: false });
    window.addEventListener("keydown", preventZoom);

    return () => {
      window.removeEventListener("wheel", preventZoom);
      window.removeEventListener("keydown", preventZoom);
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
      setTimeout(() => iniciarNovaPalavra(), 500);
    } else {
      tratarErro();
    }
  };

  return (
    <>
      <div
        className="container-jogo"
        style={{ display: isGameOver ? "none" : "flex" }}
        ref={gameContainerRef}
      >
        <div className="Esquerda">
          <div className="sub-container">
            {palavraAtual && (
              <div
                className={`palavra-atual ${
                  isShaking ? "shake-animation" : ""
                }`}
                style={{
                  top: `${posicaoVertical}px`,
                  color:
                    isShaking &&
                    inputValue.toLowerCase() === palavraAtual.toLowerCase()
                      ? "lightgreen"
                      : "white",
                }}
              >
                {palavraAtual}
              </div>
            )}
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

      {isGameOver && (
        <div id="tela-game-over" style={{ display: "flex" }}>
          <h1>GAME OVER</h1>
          <button id="botao-jogar-novamente" onClick={reiniciarJogo}>
            Jogar Novamente
          </button>
        </div>
      )}
    </>
  );
};

export default ZeroDryGame;
