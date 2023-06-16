import React, { useContext } from 'react'
//import { AuthContext } from "../context/AuthContext"

const Home = () => {
  // const { userData } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='is-flex is-flex-direction-column'>
      <div className='mr-auto ml-auto'>
        <h1 className='title'>Página Principal</h1>
      </div>
      <hr />
      <div className='box is-flex is-flex-direction-column is-justify-content-center p-6 pageMain has-background-light'
        style={{ border: "1px solid #D4D4D4", borderRadius: "8px", maxWidth: "1200px" }}>
          <p className='is-size-3'>Administracion de sistema</p>
          <hr />
        <p className='is-size-3'>Seleciona una de las opciones</p>
      </div>
    </div>
  )
}

export default Home
