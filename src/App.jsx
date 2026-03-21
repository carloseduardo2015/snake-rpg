import { useState } from 'react'
import heroImg from './assets/hero.png' // <-- O "segredo" está aqui!

function App() {
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(50);

  return (
    <div style={{ backgroundColor: '#222', color: 'white', minHeight: '100vh', padding: '20px', textAlign: 'center' }}>
      <h1>Meu RPG</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', alignItems: 'center' }}>
        
        {/* LADO DO JOGADOR */}
        <div>
          <img src={heroImg} style={{ width: '200px', borderRadius: '10px' }} alt="Herói" />
          <h3>Herói (Você)</h3>
          <p>HP: {playerHp}</p>
        </div>

        <h2 style={{ color: 'red' }}>VS</h2>

        {/* LADO DO MONSTRO */}
        <div>
          <div style={{ fontSize: '100px' }}>👹</div>
          <h3>Monstro</h3>
          <p>HP: {enemyHp}</p>
        </div>

      </div>

      <button 
        onClick={() => setEnemyHp(enemyHp - 10)}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', fontSize: '20px' }}
      >
        Dar Ataque!
      </button>
    </div>
  )
}

export default App