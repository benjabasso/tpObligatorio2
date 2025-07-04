import "../styles/Login.css";
import Layout from "../components/Layout/Layout";
import { useState } from "react";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (name === "" || email === "" || password === "") {
            setError("Todos los campos son obligatorios");
            return
        }
        
        if (email === "" ||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("El email debe ser válido");
            return;
        }

        if (name.length < 2) {
            setError("El nombre debe tener al menos 2 caracteres");
            return;
        }

        if (password.length < 6 || !/^[a-zA-Z0-9]+$/.test(password)) {
            setError("La contraseña debe tener al menos 6 caracteres y solo contener letras y números"); 
            return;
        }

        
        const newLogin = {name,email, password};  
        console.log("Usuario Logueado:", newLogin);

        setName("");
        setEmail("");
        setPassword("");
        setError("");
        alert("Login exitoso");
    }

    return (
        <>
        <Layout>
            
        <section id="login-section">
        <h1>Login</h1>    

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" name="name" id="name" placeholder="Ingresá tu nombre" onChange={handleName} value={name}/>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Ingresá tu email" onChange={handleEmail} value={email}/>

                <label htmlFor="password">Contraseña:</label>
                <input type="password" name="password" id="password" placeholder="Ingresá tu contraseña" onChange={handlePassword} value={password}/>

                <button>Ingresar</button>

            </form>
            {error && <p className="error" style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </section>

        </Layout>
        </>
    );
}
export default Login;