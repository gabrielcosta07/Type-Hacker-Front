import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./jogo.css";
import PALAVRAS from "./palavras.json";

const TypeHacker = () => {
  const navigate = useNavigate();
  const [pontuacao, setPontuacao] = useState(0);
  const [erros, setErros] = useState(0);
  const [sequenciaAcertos, setSequenciaAcertos] = useState(0);
  const [palavraAtual, setPalavraAtual] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const [isCorrect, setIsCorrect] = useState(false);

  const [posicaoVertical, setPosicaoVertical] = useState(0);
  const [tempoInicio, setTempoInicio] = useState(null);
  const [acertosTotais, setAcertosTotais] = useState(0);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  const inputRef = useRef(null);
  const gameContainerRef = useRef(null);
  const gameOverTriggered = useRef(false);

  const salvarPontuacao = useCallback(async (dadosPartida) => {
    try {
      const response = await fetch(
        "http://localhost/Trabalho-Web1-Jogo-Back/ranking/pontuar.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPartida),
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.ok && result.success) {
        console.log("Pontuação guardada com sucesso!");
      } else {
        console.error("Falha ao guardar pontuação:", result.message);
      }
    } catch (error) {
      console.error("Erro de rede ao guardar pontuação:", error);
    }
  }, []);

  const fimDeJogo = useCallback(() => {
    if (gameOverTriggered.current) return;
    gameOverTriggered.current = true;
    setIsGameOver(true);

    const tempoFim = Date.now();
    const tempoJogado = tempoInicio
      ? Math.round((tempoFim - tempoInicio) / 1000)
      : 0;
    const dadosPartida = {
      pontos: pontuacao,
      erros,
      tempo_jogado: tempoJogado,
    };
    salvarPontuacao(dadosPartida);
  }, [pontuacao, erros, tempoInicio, salvarPontuacao]);

  const iniciarNovaPalavra = useCallback(() => {
    setIsShaking(false);
    setIsCorrect(false);
    setInputValue("");
    setPosicaoVertical(0);
    setPalavraAtual(PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)]);
    inputRef.current?.focus();
  }, []);

  const reiniciarJogo = useCallback(() => {
    setPontuacao(0);
    setErros(0);
    setSequenciaAcertos(0);
    setAcertosTotais(0);
    setTempoDecorrido(0);
    setIsGameOver(false);
    setTempoInicio(Date.now());
    gameOverTriggered.current = false;
    iniciarNovaPalavra();
  }, [iniciarNovaPalavra]);

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
    let intervalo;
    if (!isGameOver) {
      intervalo = setInterval(() => {
        setTempoDecorrido((prevTempo) => prevTempo + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [isGameOver]);

  useEffect(() => {
    if (!palavraAtual || isGameOver) return;
    const inputElement = inputRef.current;
    if (!inputElement) return;
    const limiteDeQueda = inputElement.getBoundingClientRect().top;
    const velocidade = 1 + erros + acertosTotais * 0.2;

    const intervaloQueda = setInterval(() => {
      setPosicaoVertical((pos) => {
        const novaPosicao = pos + velocidade;
        if (novaPosicao >= limiteDeQueda - 20) {
          clearInterval(intervaloQueda);
          fimDeJogo();
          return pos;
        }
        return novaPosicao;
      });
    }, 50);
    return () => clearInterval(intervaloQueda);
  }, [palavraAtual, isGameOver, erros, acertosTotais, fimDeJogo]);

  const handleInputChange = (event) => {
    if (!isGameOver) setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter" || !palavraAtual || isGameOver) return;
    event.preventDefault();
    if (inputValue.toLowerCase() === palavraAtual.toLowerCase()) {
      setIsCorrect(true);

      setAcertosTotais((prev) => prev + 1);
      const pontosGanhos = 10 + sequenciaAcertos;
      setPontuacao((prev) => prev + pontosGanhos);
      setSequenciaAcertos((prev) => prev + 1);

      setTimeout(() => iniciarNovaPalavra(), 500);
    } else {
      tratarErro();
    }
  };

  const goToHome = () => navigate("/");

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
  };

  let animationClass = "";
  if (isCorrect) {
    animationClass = "correct-word-animation";
  } else if (isShaking) {
    animationClass = "shake-animation";
  }

  return (
    <>
      <div className="container-jogo" ref={gameContainerRef}>
        <div className="Esquerda">
          <div className="sub-container">
            {palavraAtual && (
              <div
                className={`palavra-atual ${animationClass}`}
                style={{
                  top: `${posicaoVertical}px`,
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
        </div>

        <div className="Direita">
          <div className="container-pontuacao">
            PONTUAÇÃO: <span id="pontos">{pontuacao}</span>
          </div>
          <div className="container-temporizador">
            TEMPO: <span>{formatarTempo(tempoDecorrido)}</span>
          </div>
        </div>
      </div>

      {isGameOver && (
        <div id="tela-game-over">
          <h1>GAME OVER</h1>
          <p>Sua pontuação final: {pontuacao}</p>
          <button id="botao-jogar-novamente" onClick={reiniciarJogo}>
            Jogar Novamente
          </button>
          <button onClick={goToHome}>Ir para Home</button>
        </div>
      )}
    </>
  );
};

export default TypeHacker;
