import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import Layout from "../components/Layout/Layout"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import "../styles/ProductDetail.css"




const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [error, setError] = useState("")
    const { user } = useAuth();


    useEffect(() => {
    const fetchProduct = async () => {
        try {
        const docRef = doc(db, "products", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setProduct(docSnap.data())
        } else {
            setError("Producto no encontrado");
        }
    } catch (err) {
        console.error("Error al obtener producto:", err)
        setError("Error al obtener el producto")
    }
    }

    fetchProduct()
    }, [id])

    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (!product) return <p>Cargando producto...</p>

    return (
        <Layout>
        <div className="product-detail-container">
            <div className="product-card">
            <h1>{product.name}</h1>
            <p className="price">${product.price}</p>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
            <button className="buy-button">Comprar</button>
            {user &&(
                <Link to={`/editar-producto/${id}`} className="edit-button">Editar Producto</Link>
            )}
            <Link to="/" className="back-button">← Volver al inicio</Link>
            </div>
        </div>
    </Layout>
)
}

export default ProductDetail
