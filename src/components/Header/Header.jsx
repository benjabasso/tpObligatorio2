import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log("Usuario desconectado");
  }

  return (
    <header>
    <nav>
      <ul>
        {user &&
        <>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/admin">Panel de administrador</Link></li>
        <button onClick={handleLogout}>Cerrar sesión</button>
        </>
        }
        {!user &&
        <>
        <li><Link to="/register">Registrate</Link></li>
        <li><Link to="/login">Login</Link></li>
        </>
        }
      </ul>
    </nav>
    </header> 
  )
}

export default Header;