import "./jogo.css";
import Fundo from "../../assets/Fundo.png";
import Campo_Digitar from "../../assets/Campo_Digitar.png";

function Jogo() {
  return (
    <div className="container-jogo">
      <img src={Fundo} alt="Background" className="backgroundJogo" />
      <div className="sub-container">
        <div className="palavras-chaves">
          <h2>digite essa palavra</h2>
        </div>
        <div className="prompt"></div>
        <div className="container-input">
          <img
            src={Campo_Digitar}
            alt="Campo de digitação"
            className="campoDigitarJogo"
          />
        </div>
        <div className="timer">

        </div>
      </div>
      <div className="container-lateral">
        <div className="personagem">

        </div>
        <div className="palavras-digitadas">
          
        </div>
      </div>
    </div>
  );
}

export default Jogo;
