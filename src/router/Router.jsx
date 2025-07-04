import {BrowserRouter, Routes,  Route} from "react-router-dom"
import Home from "../views/Home"
import Dashboard from "../views/Dashboard"
import Login from "../views/Login"
import Register from "../views/Register"


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}
export {Router}