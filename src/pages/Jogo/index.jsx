import "./jogo.css";
import Fundo from "../../assets/Fundo.png";
import Campo_Digitar from "../../assets/Campo_Digitar.png";

function Jogo() {
  return (
    <img src={Fundo} alt="Background" className="backgroundJogo" />
   {/* parte esquerda onde vai aparecer o cmd e junto a ele, a barra de digitação */}
  <div className="Esquerda"> 
  
    <div className="sub-container"> {/* parte que vai conectar tudo bonitinho, a palavra e tals */}

            <div className="palavra-atual"></div> {/* palavra que desce e que tem q acertar*/}

            <div className="container-input"> {/*form/onde vai ser o Campo realmente*/}

                <img src={Campo_Digitar} alt="Campo de digitação" className="campo-digitar"/>
     
            </div>
        
        <div className="timer"></div>  {/* literalmente o reloginho */}
      
    </div>
    
    <div className="Direita"></div>  {/* Parte em que vai ficar o personagem, log, barrinha e o manuel */}
    
    <div className="container-lateral">
    
        <div className="personagem"></div>
        
        <div className="palavras-digitadas"></div>

        <div className=""></div>
    </div>
  </div>
export default Jogo;
