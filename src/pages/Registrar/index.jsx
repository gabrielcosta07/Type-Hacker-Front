import { useState } from "react"; //Serve para armazenar os valores
import "./registrar.css";
import { useNavigate } from "react-router-dom";
function Registrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();
  const isValidEmail = (emailToValidate) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };
  
  //Não deixa a página recarregar
  const enviarFormulario = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !senha) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Por favor, insira um email válido.");
      setLoading(false);
      return;
    }

    fetch("http://localhost/Trabalho-Web1-Jogo-Back/auth/registrar_login.php", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        acao: "registrar",
        nome: nome,
        email: email,
        senha: senha,
        confirmarSenha: confirmarSenha,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      if (data.erro) {
        setError(data.erro);
      } else {
        alert(data.mensagem);
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        navigate("/Login");
      }
      setLoading(false);
    })
      .catch(() => {
        setError("Erro ao registrar. Tente novamente.");
        setLoading(false);
      });
  };
  return (
    <div className="container-registrar">
      <div className="registrar">
        <form className="form-registrar" onSubmit={enviarFormulario}>
          <h2 typeof="title" id="name-registrar">
            Registrar
          </h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-container-registrar">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-container-registrar">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-container-registrar">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-container-registrar">
            <input
              type="password"
              placeholder="Confirme sua Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>Registrar</button>
        </form>
      </div>
    </div>
  );
}
export default Registrar;
