import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="home">
        <h1 className="name">Type Hacker</h1>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
