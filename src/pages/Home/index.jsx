import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuario");
    if (usuarioLogado) {
      const dadosUsuario = JSON.parse(usuarioLogado);
      setNomeUsuario(dadosUsuario.nome);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/Trabalho-Web1-Jogo-Back/auth/logout.php", {
        credentials: "include",
      });
    } catch (error) {
      console.error("Falha ao comunicar com o servidor para logout:", error);
    } finally {
      localStorage.removeItem("usuario");
      setNomeUsuario("");
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="home">
        <h1 className="name">Type Hacker</h1>

        {nomeUsuario && (
          <h2 className="welcome-message">Bem-vindo(a), {nomeUsuario}!</h2>
        )}

        <div className="opcoes">
          <button className="btn" onClick={() => navigate("/Jogo")}>
            Iniciar Ataque
          </button>

          <button className="btn" onClick={() => navigate("/Ranking")}>
            Ranking
          </button>

          <button className="btn" onClick={() => navigate("/Liga")}>
            Liga
          </button>

          <button className="btn logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
