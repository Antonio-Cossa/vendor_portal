import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "../components/Layout/Layout.jsx"
import menuItems from "../components/Layout/menuItems.js"

import Dashboard from "../pages/Dashboard.jsx"
import Login from "../pages/Auth/Login.jsx"
import SignUp from "../pages/Auth/SignUp.jsx"
import Orders from "../pages/Orders/Orders.jsx"
import Products from "../pages/Products/Products.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import Profile from "../pages/Profile/Profile.jsx"
import ProductDetails from "../pages/Products/ProductDetails.jsx"
import NewProduct from "../pages/Products/NewProduct.jsx"
import NewOrder from "../pages/Orders/NewOrder.jsx"
import OrderDetails from "../pages/Orders/OrderDetails.jsx"
import LowStockProducts from "../pages/Products/LowStockProducts.jsx"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/entrar" element={<Login />} />
            <Route path="/cadastro" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout menuItems={menuItems} />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="produtos" >
                        <Route index element={<Products />} />
                        <Route path=":id" element={<ProductDetails />} />
                        <Route path="novo" element={<NewProduct />} />
                        <Route path="baixo-stock" element={<LowStockProducts />} />

                    </Route>

                    <Route path="encomendas" >
                        <Route index element={<Orders />} />
                        <Route path=":id" element={<OrderDetails />} />
                        <Route path="nova" element={<NewOrder />} />
                    </Route>

                    <Route path="/perfil" element={<Profile />} />
                </Route>

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />
            </Route>

        </Routes>
    )
}
