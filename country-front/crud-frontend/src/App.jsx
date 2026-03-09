import { useState } from 'react'
import UsuarioList from './components/CountryList';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Administrador de Usuarios</h1>
      </header>
      <main>
        <UsuarioList />
      </main>
      <footer>
        <p>CRUD de Usuarios © 2026</p>
      </footer>
    </div>
  )
}
export default App
