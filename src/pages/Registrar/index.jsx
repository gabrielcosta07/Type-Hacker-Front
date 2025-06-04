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

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    fetch("http://localhost/Teste_bd_jogo/auth/registrar.php", {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({
    acao: "registrar",
    nome: nome,
    email: email,
    senha: senha,
  }),
})
.then(async (res) => {
  const text = await res.text();
  console.log("Resposta bruta do PHP:", text);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Resposta não é JSON válido");
  }
})
.then((data) => {  // data já é o JSON parseado aqui
  if (data.erro) {
    setError(data.message);
  } else {
    alert(data.message);
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    navigate("/Login");
  }
  setLoading(false);
})
.catch((err) => {
  console.error("Erro no fetch:", err);
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

          <button type="submit" disabled={loading}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
export default Registrar;
