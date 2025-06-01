import { useState } from "react"; //Serve para armazenar os valores
import "./registrar.css";

function Registrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  //Não deixa a página recarregar
  const enviarFormulario = (e) => {
    e.preventDefault();

    fetch("http://localhost/Trabalho-Web1-Jogo-Back/auth/registrar_login.php", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        acao: "registrar",
        nome: nome,
        email: email,
        senha: senha,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.mensagem || data.erro))
      .catch((err) => console.error(err));
  };
  return (
    <div className="container-registrar">
      <div className="registrar">
        <form className="form-registrar" onSubmit={enviarFormulario}>
          <h2 typeof="title" id="name-registrar">
            Sing-up
          </h2>

          <div className="input-container-registrar">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="input-container-registrar">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container-registrar">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}
export default Registrar;
