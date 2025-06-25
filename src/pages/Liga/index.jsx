import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./liga.css";

const Leagues = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [leagues, setLeagues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nomeLiga, setNomeLiga] = useState("");
  const [palavraChave, setPalavraChave] = useState("");
  const [joiningLeagueId, setJoiningLeagueId] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [userLeagues, setUserLeagues] = useState([]);
  const [mostrarMinhasLigas, setMostrarMinhasLigas] = useState(false);
  const [membrosDaLiga, setMembrosDaLiga] = useState([]);
  const [ligaSelecionada, setLigaSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/Trabalho-Web1-Jogo-Back/ligas/listar_ligas.php", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false && data.error === "Não autenticado") {
          navigate("/login");
          return;
        }
        setLeagues(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Erro ao carregar ligas:", err);
        setLeagues([]);
      });
  }, [navigate]);

  const handleCreate = () => {
    if (!nomeLiga || !palavraChave) return;
    fetch("http://localhost/Trabalho-Web1-Jogo-Back/ligas/criar_liga.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeLiga, palavra_chave: palavraChave }),
    })
      .then((res) => res.json())
      .then((newLeague) => {
        if (newLeague.success) {
          const novaLiga = {
            id: newLeague.liga_id,
            nome: nomeLiga,
            nome_criador: "Você",
            qtd_jogadores: 1,
            max_jogadores: 10,
            criador_id: usuario.id,
          };
          setLeagues((prev) => [...prev, novaLiga]);
          setUserLeagues((prev) => [...prev, novaLiga.id]);
          setShowForm(false);
          setNomeLiga("");
          setPalavraChave("");
        } else {
          alert(newLeague.error || "Erro ao criar liga");
        }
      })
      .catch((err) => console.error("Erro ao criar liga:", err));
  };

  const handleRequestJoin = (id) => {
    setJoiningLeagueId(id);
    setEnteredPassword("");
  };

  const handleJoin = () => {
    const id = joiningLeagueId;
    fetch("http://localhost/Trabalho-Web1-Jogo-Back/ligas/add_membro.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, palavra_chave: enteredPassword }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setLeagues((prev) =>
            prev.map((league) =>
              league.id === id
                ? { ...league, qtd_jogadores: league.qtd_jogadores + 1 }
                : league
            )
          );
          setUserLeagues((prev) => [...prev, id]);
          setJoiningLeagueId(null);
        } else {
          alert(result.error || "Palavra-chave incorreta!");
        }
      })
      .catch((err) => console.error("Erro ao entrar na liga:", err));
  };

  const handleVerMembros = (liga) => {
    setLigaSelecionada(liga);
    fetch(
      `http://localhost/Trabalho-Web1-Jogo-Back/ligas/listar_membros.php?id=${liga.id}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.error || "Erro ao buscar membros.");
          return;
        }
        setMembrosDaLiga(data.membros);
      })
      .catch((err) => {
        console.error("Erro ao buscar membros:", err);
        alert("Erro de comunicação ao buscar membros.");
      });
  };

  const ligasFiltradas = mostrarMinhasLigas
    ? leagues.filter(
        (l) =>
          (l.criador_id &&
            usuario &&
            l.criador_id.toString() === usuario.id.toString()) ||
          userLeagues.includes(l.id)
      )
    : leagues;

  return (
    <>
      <div className="leagues-container">
        <div className="main-content">
          <h1 className="title">Ligas</h1>
          <div className="controls">
            <button className="home-btn" onClick={() => navigate("/")}>
              &larr; Voltar para Home
            </button>
            <button className="create-btn" onClick={() => setShowForm(true)}>
              Criar Liga
            </button>
            <button
              className={`filter-btn ${mostrarMinhasLigas ? "active" : ""}`}
              onClick={() => setMostrarMinhasLigas(!mostrarMinhasLigas)}
            >
              {mostrarMinhasLigas ? "Todas as Ligas" : "Minhas Ligas"}
            </button>
          </div>

          <div className="leagues-list-wrapper">
            <div className="leagues-list">
              {ligasFiltradas.map((league) => (
                <div key={league.id} className="league-card">
                  <div className="league-info">
                    <div className="league-details">
                      <h3 className="league-name">{league.nome}</h3>
                      <span className="players">
                        Jogadores: {league.qtd_jogadores}/{league.max_jogadores}
                      </span>
                      <span
                        className={`creator ${
                          league.criador_id &&
                          usuario &&
                          league.criador_id.toString() === usuario.id.toString()
                            ? "voce"
                            : ""
                        }`}
                      >
                        Criador:{" "}
                        {league.criador_id &&
                        usuario &&
                        league.criador_id.toString() === usuario.id.toString()
                          ? "Você"
                          : league.nome_criador}
                      </span>
                    </div>
                  </div>
                  <div className="buttons">
                    {userLeagues.includes(league.id) ||
                    (league.criador_id &&
                      usuario &&
                      league.criador_id.toString() ===
                        usuario.id.toString()) ? (
                      <button
                        className="view-members-btn"
                        onClick={() => handleVerMembros(league)}
                      >
                        Ver Membros
                      </button>
                    ) : (
                      <button
                        className="enter-btn"
                        onClick={() => handleRequestJoin(league.id)}
                        disabled={league.qtd_jogadores >= league.max_jogadores}
                      >
                        {league.qtd_jogadores >= league.max_jogadores
                          ? "Lotado"
                          : "Entrar"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Nova Liga</h2>
            <input
              type="text"
              placeholder="Nome da Liga"
              value={nomeLiga}
              onChange={(e) => setNomeLiga(e.target.value)}
            />
            <input
              type="password"
              placeholder="Palavra-chave"
              value={palavraChave}
              onChange={(e) => setPalavraChave(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="modal-btn primary" onClick={handleCreate}>
                Criar
              </button>
              <button
                className="modal-btn secondary"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {joiningLeagueId !== null && (
        <div className="modal">
          <div className="modal-content">
            <h2>Digite a palavra-chave</h2>
            <input
              type="password"
              placeholder="Palavra-chave"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="modal-btn primary" onClick={handleJoin}>
                Entrar
              </button>
              <button
                className="modal-btn secondary"
                onClick={() => setJoiningLeagueId(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {ligaSelecionada !== null && (
        <div className="modal">
          <div className="modal-content">
            <h2>Membros de "{ligaSelecionada.nome}"</h2>
            <ul className="members-list">
              {membrosDaLiga.length > 0 ? (
                membrosDaLiga.map((membro) => (
                  <li key={membro.id} className="member-item">
                    {membro.nome}
                  </li>
                ))
              ) : (
                <li>Nenhum membro encontrado.</li>
              )}
            </ul>
            <button
              className="modal-btn secondary"
              onClick={() => setLigaSelecionada(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Leagues;
