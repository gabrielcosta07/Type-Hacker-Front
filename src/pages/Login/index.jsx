import "./login.css";
import {FaUser,FaLock}  from "react-icons/fa";

function Login() {
  return (
    <div className="container-login">
      <div className="login">
        <form className="form-login">
          <h2 typeof="title">Login</h2>
          <div className="input-container">
            <FaUser className="icon" />
            <input type="text" placeholder="Email" />
          </div>
          <div className="input-container">
            <FaLock className="icon" />
            <input type="password" placeholder="Senha" />
          </div>
          <button className = "btn-login" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
