import {BrowserRouter, Routes,  Route} from "react-router-dom"
import Home from "../views/Home"
import Dashboard from "../views/Dashboard"
import Login from "../views/Login"
import Register from "../views/Register"
import NotFound from "../views/NotFound"
import EditProduct from "../views/EditProduct"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/editar-producto/:id" element={<EditProduct/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
export {Router}