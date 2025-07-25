import "../styles/Login.css";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../config/firebase"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if ( email === "" || password === "") {
            setError("Todos los campos son obligatorios");
            return
        }
        
        if (email === "" ||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("El email debe ser válido");
            return;
        }


        if (password.length < 6 || !/^[a-zA-Z0-9]+$/.test(password)) {
            setError("La contraseña debe tener al menos 6 caracteres y solo contener letras y números"); 
            return;
        }

        
        const newLogin = {email, password};  
        console.log("Usuario Logueado:", newLogin);

        try {
            await login(email, password)
                    setSuccess(true);
                    setEmail("");
                    setPassword("");
                    console.log("Usuario logueado con éxito");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
        } catch (error) {
            setError("Error al iniciar sesión: " + error.message);
        }
        setError("");
    }

    return (
        <>
        <Layout>
            
        <section id="login-section">
        <h1>Login</h1>    

            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Ingresá tu email" onChange={handleEmail} value={email}/>

                <label htmlFor="password">Contraseña:</label>
                <input type="password" name="password" id="password" placeholder="Ingresá tu contraseña" onChange={handlePassword} value={password}/>

                <button>Ingresar</button>

            </form>
            {error && <p className="error" style={{ color: "red", textAlign: "center" }}>{error}</p>}
            {success && <p className="success" style={{ color: "green", textAlign: "center" }}>Usuario logueado con éxito, redirigiendo...</p>}
        </section>

        </Layout>
        </>
    );
}
export default Login;