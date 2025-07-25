import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../context/AuthContext";



const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const {register} = useAuth();

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

    const handleSubmit = async (e) => {
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


        try {

        await register(email, password);
        console.log("Usuario registrado con éxito");

        
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("El email ya está en uso");
            } else if (error.code === "auth/invalid-email") {
                setError("El email es inválido");
            } else if (error.code === "auth/weak-password") {
                setError("La contraseña es demasiado débil");
            } else {
                setError("Error al crear la cuenta: " + error.message);
            }
            return;
        }
        
        setSuccess(true);
        setTimeout(() => {
            navigate("/");
        }, 2000);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
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
            {success && <p className="success" style={{ color: "green", textAlign: "center"}}>Usuario registrado con éxito, redirigiendo...</p>}
        </section>
        </Layout>       
    );
}

export default Register;

