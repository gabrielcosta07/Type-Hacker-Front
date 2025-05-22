import "./style.css";
import Fundo from "../../assets/Fundo.png";
import Campo_Digitar from "../../assets/Campo_Digitar.png";

function Jogo() {
  return (
    <div>
      <img src={Fundo} alt="Background" className="backgroundJogo" />
      <img src={Campo_Digitar} alt="Campo de digitação" className="campoDigitarJogo" />
    </div>
  );
}

export default Jogo;
