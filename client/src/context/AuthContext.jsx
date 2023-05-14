import { createContext, useState } from "react";

const AuthContext = createContext();

const [userData, setUserData] = useState({ nombre: "", rol: "" });

const data = { userData, setUserData };

const AuthContextProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;