import React, { useContext } from 'react'
//import { AuthContext } from "../context/AuthContext"

const Home = () => {
  // const { userData } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <h1 className='title is-1'>HOLA</h1>
    </>
  )
}

export default Home
