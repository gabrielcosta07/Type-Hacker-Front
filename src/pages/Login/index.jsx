import './style.css'

function Login() {
    return (
        <div className='container'>
        <div className='login'>
            <h1>Login</h1>
            <form>
                
            <div className='input-container'>
                <input type="text" placeholder="Usuário" />
            </div>
            <div className='input-container'>
                <input type="password" placeholder="Senha" />
            </div>
            <button type="submit">Entrar</button>
            </form>
        </div>
        </div>
    )
    }

    export default Login