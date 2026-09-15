import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loadding/Loading';


export default function ProtectedRoute() {

    const {
        isAuthenticated,
        loading
    } = useAuth();

    if (loading) {
        return <Loading />
    }

    if (!isAuthenticated) {
        return <Navigate to="/entrar" replace />
    }

    return <Outlet />
}