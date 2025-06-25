import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      navigate("/");
    }
  }, [navigate]);

  const isValidEmail = (emailToValidate) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

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

    try {
      const response = await fetch(
        "http://localhost/Trabalho-Web1-Jogo-Back/auth/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, senha }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Erro ao processar a resposta do servidor.",
        }));
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        localStorage.setItem("usuario", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message || "Email ou senha inválidos.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Erro no login:", err);
      setError(
        err.message ||
          "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div className="container-login">
      <div className="login">
        <form className="form-login" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-container">
            <FaUser className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              disabled={loading}
            />
          </div>
          <div className="input-container">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="login-input"
              disabled={loading}
            />
          </div>
          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <p>
            Não possui uma conta? <Link to="/Registrar">Registre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
