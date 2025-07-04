import { useEffect } from "react";
import "./Main.css";
import { useState } from "react";

const Main = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    

    const fetchingProducts = async () => {
    try {
        const respuesta = await fetch("https://fakestoreapi.com/products")
        const data = await respuesta.json();
        setProducts(data);
    } catch (error) 
        {
            console.error("Error fetching products:", error);
            setError("No se pudieron cargar los productos");
        }
    }

    useEffect(() => {
        fetchingProducts();
    }, [])


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
                            <img src={producto.image} alt={producto.title} />
                            <h3>{producto.title}</h3>
                            <p>{producto.description}</p>
                            <span>${producto.price}</span>
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