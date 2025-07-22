import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const EditProduct = () => {

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [error, setError] = useState("");
const [message, setMessage] = useState("");

const handleName = (event) => {
    setName(event.target.value);
}
const handlePrice = (event) => {
    setPrice(Number(event.target.value));
}
const handleDescription = (event) => {
    setDescription(event.target.value);
}


const handleSubmit = async (e) => {
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


    const newProduct = {name, price, description};  
    
    console.log("Producto agregado:", newProduct);;
    try {
        await createProduct(newProduct);
        setMessage("Producto agregado exitosamente, redirigiendo...");

    setName("");
    setPrice("");
    setDescription("");
    setError("");
    setTimeout(() => {
        setMessage("");
        navigate("/");
    }, 3000);

    } catch (error) {
        console.error("Error al agregar el producto:", error);
        setError("Error al agregar el producto");
    }

}


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
            {message && <p style={{color:"green"}}>{message}</p>}
            </form>
        </section>

        </Layout> 
    );
};

export default EditProduct;