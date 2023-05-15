import React, { useContext } from 'react'
//import { AuthContext } from "../context/AuthContext"

const Home = () => {
  // const { userData } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <h1>Bienvenido {user.nombre}</h1>
      <h3>{user.rol}</h3>
    </>
  )
}

export default Home
