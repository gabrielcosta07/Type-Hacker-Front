import React, { useState, useEffect } from "react";
import { FaTrophy } from "react-icons/fa";
import "./ranking.css";

const Ranking = () => {
  const [activeTab, setActiveTab] = useState("geral");
  const [rankings, setRankings] = useState({
    geral: [],
    semanal: [],
    liga: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      "http://localhost/Trabalho-Web1-Jogo-Back/ranking/listar_rankings.php",
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
        setRankings(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar o ranking:", err);
        setError(
          "Não foi possível carregar os rankings. Tente novamente mais tarde."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getRankClass = (index) => {
    if (index === 0) return "rank-1";
    if (index === 1) return "rank-2";
    if (index === 2) return "rank-3";
    return "";
  };

  const currentRankingData = rankings[activeTab] || [];

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">Ranking</h1>

      <div className="ranking-tabs">
        <button
          className={activeTab === "geral" ? "active" : ""}
          onClick={() => setActiveTab("geral")}
        >
          Geral
        </button>
        <button
          className={activeTab === "semanal" ? "active" : ""}
          onClick={() => setActiveTab("semanal")}
        >
          Semanal
        </button>
        <button
          className={activeTab === "liga" ? "active" : ""}
          onClick={() => setActiveTab("liga")}
        >
          Sua Liga
        </button>
      </div>

      <div className="ranking-list">
        {isLoading && <p>Carregando ranking...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && (
          <ol>
            {currentRankingData.length > 0 ? (
              currentRankingData.map((player, index) => (
                <li
                  key={player.id}
                  className={`ranking-item ${getRankClass(index)}`}
                >
                  <span className="ranking-position">
                    {index + 1}
                    {index < 3 && <FaTrophy className="ranking-trophy-icon" />}
                  </span>
                  <span className="ranking-name">{player.nome}</span>
                  <span className="ranking-score">
                    {player.pontuacao.toLocaleString("pt-BR")} PTS
                  </span>
                </li>
              ))
            ) : (
              <p>Nenhum dado disponível para este ranking.</p>
            )}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Ranking;
