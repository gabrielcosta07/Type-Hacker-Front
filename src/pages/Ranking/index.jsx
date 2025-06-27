import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";
import "./ranking.css";

const Ranking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("geral");
  const [rankings, setRankings] = useState({ geral: [], semanal: [] });
  const [userLeagues, setUserLeagues] = useState([]);
  const [selectedLiga, setSelectedLiga] = useState(null);
  const [isLigaLoading, setIsLigaLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "http://localhost/Trabalho-Web1-Jogo-Back/ranking/listar_rankings.php",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRankings({ geral: data.geral, semanal: data.semanal });
        setUserLeagues(data.liga);
      })
      .catch((err) => setError("Não foi possível carregar os rankings."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectLiga = (ligaId) => {
    setIsLigaLoading(true);
    setError(null);
    fetch(
      `http://localhost/Trabalho-Web1-Jogo-Back/ranking/listar_detalhes_liga.php?id=${ligaId}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSelectedLiga(data.data);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) =>
        setError("Não foi possível carregar os detalhes da liga.")
      )
      .finally(() => setIsLigaLoading(false));
  };

  const renderContent = () => {
    if (isLoading) return <p>Carregando rankings...</p>;
    if (error) return <p className="error-message">{error}</p>;

    if (activeTab === "geral" || activeTab === "semanal") {
      const data = rankings[activeTab] || [];
      return (
        <ol>
          {data.length > 0 ? (
            data.map((player, index) => (
              <li key={player.id} className={`ranking-item rank-${index + 1}`}>
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
            <p>Nenhum dado disponível.</p>
          )}
        </ol>
      );
    }

    if (activeTab === "liga") {
      if (isLigaLoading) return <p>Carregando detalhes da liga...</p>;

      if (selectedLiga) {
        return (
          <>
            <button
              onClick={() => setSelectedLiga(null)}
              className="back-leagues-button"
            >
              &larr; Voltar à lista de ligas
            </button>
            <h2 className="liga-subtitle">{selectedLiga.nome_liga}</h2>
            <table className="liga-table">
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Jogador</th>
                  <th>Pontuação Semanal</th>
                  <th>Pontuação Geral</th>
                </tr>
              </thead>
              <tbody>
                {selectedLiga.membros.map((m, i) => (
                  <tr key={m.id} className={`rank-${i + 1}`}>
                    <td>
                      {i + 1}
                      {i < 3 && <FaTrophy className="ranking-trophy-icon" />}
                    </td>
                    <td>{m.nome}</td>
                    <td>{m.pontuacao_semanal.toLocaleString("pt-BR")}</td>
                    <td>{m.pontuacao_geral.toLocaleString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      }

      return (
        <>
          <h2 className="liga-subtitle">Selecione uma Liga</h2>
          <div className="leagues-list">
            {userLeagues.length > 0 ? (
              userLeagues.map((liga) => (
                <button
                  key={liga.id}
                  onClick={() => handleSelectLiga(liga.id)}
                  className="league-button"
                >
                  {liga.nome}
                </button>
              ))
            ) : (
              <p>Você não está em nenhuma liga.</p>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <div className="ranking-container">
      <button onClick={() => navigate("/")} className="back-home-button">
        &larr; Voltar para Home
      </button>
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
          onClick={() => {
            setSelectedLiga(null);
            setActiveTab("liga");
          }}
        >
          Suas Ligas
        </button>
      </div>
      <div className="ranking-list">{renderContent()}</div>
    </div>
  );
};

export default Ranking;
