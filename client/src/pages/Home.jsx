import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"
const Home = () => {
  const { userData } = useContext(AuthContext)
  return (
    <>
      <h1>Bienvenido {userData.nombre}</h1>
      <h3>{userData.rol}</h3>
    </>
  )
}

export default Home
