import "./style.css";
import {FaUser,FaLock}  from "react-icons/fa";
import React, { useState } from 'react';


function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  /* aqui vai o code para enviar para o php e la no back vai gravar no DB */
  return (
    <div className="container-login">
      <div className="login">
        <form className="form-login">
          <h2 typeof="title">Login</h2>
          <div className="input-container">
            <FaUser className="icon" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input"/>
          </div>
          <div className="input-container">
            <FaLock className="icon" />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}  className="input"/>
          </div>
          <button className = "btn-login" type="submit">Entrar</button>
          <p>Não possui uma conta? <a href="#"> Registre-se </a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
