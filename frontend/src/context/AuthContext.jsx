import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [vendor, setVendor] = useState(null)
    const [loading, setloading] = useState(true)

    const checkAuth = async () => {


        try {
            const res = await api.get("/auth/me")
            setVendor(res.data.vendor)
        } catch (e) {
            setVendor(null)
        } finally {
            setloading(false)
        }


    }

    useEffect(() => {
        checkAuth();
    }, []);


    const login = async (credentials) => {
        const res = await api.post("/auth/login", credentials)

        setVendor(res.data.vendor)
        return res.data
    }


    const register = async (data) => {

        const res = await api.post("/auth/register", data)

        setVendor(res.data.vendor)
        return res.data
    }


    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } finally {
            setVendor(null);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                vendor,
                loading,
                login,
                register,
                logout,
                checkAuth,
                isAuthenticated: !!vendor
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}