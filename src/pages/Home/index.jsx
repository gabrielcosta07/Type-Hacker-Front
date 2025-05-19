
import './style.css'

function Home() {
  

  return (
    <div className='container'>
      <div className='bemvindo'>
        <h1>Bem vindo ao Jogo</h1>
      </div>
      <div className='opcoes'>
        <h2>Escolha uma opção</h2>
        <div className='opcoes-container'>
          <button className='opcao'>Jogar</button>
          <button className='opcao'>Ranking</button>
          <button className='opcao'>Liga</button>
        </div>
      </div>
    </div>
  )
}

export default Home
