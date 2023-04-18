import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistroCliente from './pages/RegistroCliente'
import ListaClientes from './pages/ListaClientes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ListaClientes />
    </div>
  )
}

export default App
