
import Layout from "../components/Layout/Layout";
import "../styles/NotFound.css";
const NotFound = () => {
    return (  

        <Layout>
            <div className="not-found">
                <h1>404</h1>
                <h2>Página no encontrada</h2>
                <p>Lo sentimos, la página que buscas no existe.</p>
                <p>Por favor, verifica la URL o vuelve a la página principal.</p>
            </div>
        </Layout>       
    );
}

export default NotFound;

