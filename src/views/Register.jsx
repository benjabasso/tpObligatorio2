import "../styles/Register.css";
import Layout from "../components/Layout/Layout";
import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
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

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        
        const newRegister = {name,email, password};  
        console.log("Usuario Registrado:", newRegister);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        alert("Registro exitoso");
    }

    return (  

        <Layout>
        <section id="register-section">
        <h1>Registro</h1>    

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" name="name" id="name" placeholder="Ingresá tu nombre" onChange={handleName} value={name}/>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Ingresá tu email" onChange={handleEmail} value={email}/>

                <label htmlFor="password">Contraseña:</label>
                <input type="password" name="password" id="password" placeholder="Ingresá tu contraseña"onChange={handlePassword} value={password}/>

                <label htmlFor="confirm-password">Confirmar Contraseña:</label>
                <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirmá tu contraseña"onChange={handleConfirmPassword} value={confirmPassword}/>

                <button>Crear cuenta</button>
            </form>

            {error && <p className="error" style={{ color: "red", textAlign: "center"}}>{error}</p>}

        </section>
        </Layout>       
    );
}

export default Register;

