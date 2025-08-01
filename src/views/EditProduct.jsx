import React, { use, useState, useEffect} from 'react';
import { collection, addDoc } from "firebase/firestore";
import Layout from '../components/Layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, query, where, getDocs } from "firebase/firestore";



const EditProduct = () => {

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [sku, setSku] = useState("");
const [error, setError] = useState("");
const [message, setMessage] = useState("");
const navigate = useNavigate();
const { id } = useParams();
const productsRef = collection(db, "products");

const checkIfSkuExistsForOtherProduct = async (skuToCheck, currentProductId) => {
    const q = query(productsRef, where("sku", "==", skuToCheck));
    const snapshot = await getDocs(q);
    return snapshot.docs.some(doc => doc.id !== currentProductId);
};


//Traer producto de la base de datos
const fetchProduct = async (id) => {
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const productData = docSnap.data();
            setName(productData.name);
            setPrice(productData.price);
            setDescription(productData.description);
            setSku(productData.sku);
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
    }

};

useEffect(() => {
    fetchProduct(id);
}, [id]);


const handleName = (event) => {
    setName(event.target.value);
}
const handlePrice = (event) => {
    setPrice(Number(event.target.value));
}
const handleDescription = (event) => {
    setDescription(event.target.value);
}
const handleSku = (event) => {
    setSku(event.target.value);
}


const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const updatedAt = Date.now();

    if (!name || !price || !description || !sku) {
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

    if (sku.length < 3) {
        setError("El SKU debe tener al menos 3 caracteres");
        return;
    }

    const skuExists = await checkIfSkuExistsForOtherProduct(sku, id);
    if (skuExists) {
        setError("El SKU ya existe, por favor elige otro");
        return;
    }

    try {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {name, price, description, sku, updatedAt: Date.now()});
        setMessage("Producto editado correctamente, redirigiendo...");
        setTimeout(() => {
            navigate("/");
        }, 2000); // Redirige después de 2 segundos
    } catch (error) {
        console.error("Error al editar el producto:", error);
        setError("Error al editar el producto");
    }   

    console.log("Producto editado!", {name, price, description, sku, updatedAt});

}


    return (
        <Layout>

        <section id="admin-section">
        <h1>Editar Producto</h1>    
        <p>Aquí puedes actualizar tu producto. 
        Puedes modificar nombre, precio o descripción como lo desees.</p>   
        <p>Editando producto: {id}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre del producto:</label>
                <input type="text" name="name" id="name" onChange={handleName} value={name}/>

                <label htmlFor="price">Precio del producto:</label>
                <input type="number" name="price" id="price" onChange={handlePrice} value={price}/>

                <label htmlFor="description">Descripcion del producto:</label>
                <textarea name="description" id="description" onChange={handleDescription} value={description}></textarea>

                <label htmlFor="sku">SKU del producto:</label>
                <input type="text" name="sku" id="sku" onChange={handleSku} value={sku}/>
                
                <button>Editar Producto</button>
            
            {error && <p style={{color: "red"}}>{error}</p>}
            {message && <p style={{color:"green"}}>{message}</p>}
            </form>
        </section>

        </Layout> 
    );
};

export default EditProduct;