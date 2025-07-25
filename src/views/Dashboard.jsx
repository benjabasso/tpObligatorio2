import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Dashboard.css";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    const productsRef = collection(db, "products");

    const createProduct = async (newProduct) => {
        const createdAt = Date.now();
        const updatedAt = Date.now();
        try {
            const productRef = await addDoc(productsRef,{createdAt, updatedAt,...newProduct});
            console.log("Producto agregado con ID:", productRef.id);
            return productRef
        }catch (error) {
            console.error("Error al agregar el producto:", error);
            setError("Error al agregar el producto");
            }
        }

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

        try {
            const newProduct = {name, price, description};
            await createProduct(newProduct);
            setMessage("Producto agregado correctamente, redirigiendo...");
            setName("");
            setPrice("");
            setDescription("");
            setTimeout(() => {
                navigate("/");
            }, 2000); // Redirige después de 2 segundos
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            setError("Error al agregar el producto");
        }
        console.log("Producto agregado!", {name, price, description});

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
            {message && <p style={{color:"green"}}>{message}</p>}
            </form>
        </section>

        </Layout> 
    );
}
export default Dashboard