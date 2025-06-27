import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./historico.css";

const Historico = () => {
  const navigate = useNavigate();
  const [historico, setHistorico] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      "http://localhost/Trabalho-Web1-Jogo-Back/historico/listar_historico.php",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao buscar os dados do servidor.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setHistorico(data.historico);
        } else {
          throw new Error(
            data.message || "Não foi possível carregar o histórico."
          );
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar o histórico:", err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="historico-container">
      <button onClick={goToHome} className="back-home-button">
        &larr; Voltar para Home
      </button>
      <h1 className="historico-title">Seu Histórico de Partidas</h1>

      <div className="historico-list">
        {isLoading && <p>Carregando histórico...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && (
          <table>
            <thead>
              <tr>
                <th>Data da Partida</th>
                <th>Pontuação</th>
                <th>Erros</th>
                <th>Tempo Jogado</th>
              </tr>
            </thead>
            <tbody>
              {historico.length > 0 ? (
                historico.map((partida) => (
                  <tr key={partida.id}>
                    <td>{partida.data_formatada}</td>
                    <td>{partida.pontos.toLocaleString("pt-BR")}</td>
                    <td>{partida.erros}</td>
                    <td>{partida.tempo_jogado} seg</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Você ainda não jogou nenhuma partida.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Historico;
