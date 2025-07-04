import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Dashboard.css";


const Dashboard = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(Number(event.target.value));
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!name || !price || !description) {
            setError("Todos los campos son obligatorios");
            return
        }
        
        if (price <= 0) {
            setError("El precio debe ser mayor a 0");
            return;
        }

        if (name.length < 2) {
            setError("El nombre del producto debe tener al menos 2 caracteres");
            return;
        }


        const newProduct = {name,price, description};  
        console.log("Producto agregado:", newProduct);

        setName("");
        setPrice("");
        setDescription("");
        setError("");
        alert("Producto agregado exitosamente");
    }

    useEffect(() => {
        if(name && price && description) {
            setError("");
        }
    }, [name, price, description]);

    return (
        <Layout>

        <section id="admin-section">
        <h1>Panel de Administración</h1>    
        <p>Aquí puedes administrar todos tus productos. 
        Puedes agregar, modificar o borrar lo que desees.</p>   
        
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre del producto:</label>
                <input type="text" name="name" id="name" onChange={handleName} value={name}/>

                <label htmlFor="price">Precio del producto:</label>
                <input type="number" name="price" id="price" onChange={handlePrice} value={price}/>

                <label htmlFor="description">Descripcion del producto:</label>
                <textarea name="description" id="description" onChange={handleDescription} value={description}></textarea>

                <button>Agregar Producto</button>
            
            {error && <p style={{color: "red"}}>{error}</p>}
            </form>
        </section>

        </Layout> 
    );
}
export default Dashboard;