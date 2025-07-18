import { useEffect } from "react";
import "./Main.css";
import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";


const Main = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    
    //Simulacion de usuario conectado
    const [user, setUser] = useState(true)

    const fetchingProducts = async () => {

        const productsRef = collection(db, "products");

        const snapshot = await getDocs(productsRef)
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
        setProducts(docs)

    }

    useEffect(() => {
        fetchingProducts();
    }, [])

    const handleDeleteProduct = async (id) => {
        try {
            if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            await deleteDoc(doc(db, "products", id));
            setProducts(products.filter(p => p.id !== id));
            console.log("Producto eliminado con ID:", id);}}
        catch (error) {
            console.error("Error al eliminar el producto:", error);
            setError("No se pudo eliminar el producto");
        }

    }

    return (
        <main>

        <section className='banner'>
            <h1>Bienvenidos a la tienda</h1>
            <h2>Los mejores precios de la ciudad.</h2>
        </section>

        <section className='productList'>
            {
                products.length === 0 && <h2>No hay productos disponibles</h2>
            }

            {
                products.map((producto, index)=> {
                    console.log(producto, "producto n°", index + 1);
                    return (
                        <div className="product">
                            <h3>{producto.name}</h3>
                            <p>{producto.description}</p>
                            <span>${producto.price}</span>
                            {user && 
                            <div className="user-buttons">
                                <button>Actualizar</button>
                                <button onClick={() => handleDeleteProduct(producto.id)}>Eliminar</button>
                            </div>
                            }
                            <button>Añadir al carrito</button>
                        </div>

                    )

                })
            }
            </section>     
        </main>
    )
}
export default Main;