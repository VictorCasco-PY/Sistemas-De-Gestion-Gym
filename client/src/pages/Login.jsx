import React, { useState, useEffect } from "react";




const Login = () => {

    const  [ usuario, setUsuario ] = useState(
        {
            user: "",
            pass: "",
        }
    );

    const [isLogin, setIsLogin] = useState(false);
    const [hasError, setHasError] = useState(false);


    const handleChange = (event) => {
        setDatos({
            ...ususuario,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(datos);
        login(event);
    };

    function login(e){
        if(e.email === "admin@gmail.com" && e.pass === "123456"){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    }

    return (
        
        <div className="columns is-centered">
        <div className="column is-three-fifths-desktop">
            <div className="box">
            <h3>Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input name = "email" value={usuario.user} className ="input" type="email" placeholder="Correo Electronico" onChange={handleChange} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input name = "pass" value={usuario.pass} className="input" type="password" placeholder="Password" onChange={handleChange} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <button type="submit" className="button is-info is-outlined" >Iniciar Sesión</button>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Login;