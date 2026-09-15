import {
    createContext,
    useContext,
    useState,
} from "react";

import api from "../services/api";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productPagination, setProductPagination] = useState({
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviusPage: false,
    });

    const [orderPagination, setOrderPagination] = useState({
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviusPage: false,
    });

    const [loadingOrders, setLoadingOrders] = useState(false);

    const [productsLoaded, setProductsLoaded] = useState(false);

    const [ordersLoaded, setOrdersLoaded] = useState(false);

    const getProducts = async (params = {}) => {
        try {
            setLoadingProducts(true);

            const response = await api.get(
                "/products",
                {
                    params,
                }
            );

            const data = response.data;

            setProducts(data.products || []);

            setProductPagination(
                data.pagination
            );

            setProductsLoaded(true);

            return data;
        } finally {
            setLoadingProducts(false);
        }
    };

    const getProduct = async (id) => {
        const response = await api.get(
            `/products/${id}`
        );

        return response.data;
    };

    const createProduct = async (data) => {

        data.stock = Number(data.stock)
        data.price = Number(data.price)

        const response = await api.post(
            "/products",
            data
        );

        await getProducts();

        return response.data;
    };

    const updateProduct = async (id, data) => {
        const response = await api.patch(
            `/products/${id}`,
            data
        );

        await getProducts();

        return response.data;
    };



    const updateStock = async (id, data) => {
        const response = await api.patch(
            `/products/${id}/stock`,
            data
        );

        await getProducts();

        return response.data;
    };


    const createOrder = async (data) => {
        const response = await api.post(
            "/orders",
            data
        );

        await getOrders();

        return response.data;
    };



    const getOrders = async (params = {}) => {
        try {
            setLoadingOrders(true);

            const response = await api.get(
                "/orders",
                { params }
            );

            const data = response.data;

            setOrders(data.orders);
            setOrderPagination(data.pagination);
            setOrdersLoaded(true);

            return data;
        } finally {
            setLoadingOrders(false);
        }
    };

    const getOrder = async (id) => {
        const response = await api.get(
            `/orders/${id}`
        );

        return response.data;
    };

    const confirmOrder = async (id) => {

        const response = await api.patch(`/orders/${id}/confirm`)

        return response.data
    }

    const updateOrderStatus = async (
        id,
        status
    ) => {
        const response = await api.patch(
            `/orders/${id}/status`,
            { status }
        );

        await getOrders();

        return response.data;
    };


    const updateVendor = async (data) => {
        const response = await api.patch("/auth", data)
        return response.data

    }

    return (
        <DataContext.Provider
            value={{
                products,
                loadingProducts,
                productsLoaded,
                productPagination,

                getProducts,
                getProduct,
                createProduct,
                updateProduct,
                updateStock,

                orders,
                createOrder,
                loadingOrders,
                ordersLoaded,
                getOrders,
                getOrder,
                confirmOrder,
                orderPagination,
                updateOrderStatus,

                updateVendor
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error(
            "useData must be used inside DataProvider"
        );
    }

    return context;
}