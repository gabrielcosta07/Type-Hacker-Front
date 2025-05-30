import "./registrar.css";

function Registrar() {
  return (
    <div className="container-registrar">
      <div className="registrar">
        <form className="form-registrar">
          <h2 typeof = "title" id="name-registrar">Sing-up</h2>
          <div className="input-container-registrar">
            <input type="text" placeholder="Nome" />
          </div>
          <div className="input-container-registrar">
            <input type="text" placeholder="Email" />
          </div>

          <div className="input-container-registrar">
            <input type="password" placeholder="Senha" />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}
export default Registrar;
