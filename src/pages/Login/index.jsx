import "./login.css";
import {FaUser,FaLock}  from "react-icons/fa";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /*validando email*/
  const isValidEmail = (emailToValidate) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };
  /* aqui vai o code para enviar para o php e la no back vai gravar no DB */
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
      const response = await fetch('http://localhost/seu-projeto-php/api/login.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ email: email, senha: senha }), 
      });

      setLoading(false); 

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erro ao processar a resposta do servidor." }));
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const data = await response.json(); 

      console.log('Login bem-sucedido:', data);
      // Exemplo de redirecionamento (se você tiver o useNavigate hook):
      // navigate('/dashboard');

      
      if (data.success) {
        console.log("Login realizado!", data.message);
      } else {
        setError(data.message || "Email ou senha inválidos.");
      }

    } catch (err) {
      setLoading(false); 
      console.error('Falha ao tentar fazer login:', err);
      setError(err.message || "Não foi possível conectar ao servidor. Tente novamente mais tarde.");
    }
  };



  return (
    <div className="container-login">
      <div className="login">
        <form className="form-login" onSubmit={handleSubmit}>
          <h2 typeof="title">Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-container">
            <FaUser className="icon" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input"  disabled={loading}/>
          </div>
          <div className="input-container">
            <FaLock className="icon" />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}  className="input"  disabled={loading}/>
          </div>
          <button className = "btn-login" type="submit"  disabled={loading}>Entrar</button>
          <p>Não possui uma conta? <Link to="/Registrar">Registre-se</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
