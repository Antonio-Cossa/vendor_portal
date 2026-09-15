import {
    AiOutlineDashboard
} from "react-icons/ai";

import {
    PiPackageLight
} from "react-icons/pi";

import {
    BsCart2
} from "react-icons/bs";

import {
    CiUser
} from "react-icons/ci";

const menuItems = {
    top: [
        {
            id: "dashboard",
            label: "Dashboard",
            path: "/dashboard",
            icon: AiOutlineDashboard,
        },

        {
            id: "products",
            label: "Produtos",
            path: "/produtos",
            icon: PiPackageLight,

            children: [
                {
                    id: "products-list",
                    label: "Lista de produtos",
                    path: "/produtos",
                },
                {
                    id: "products-new",
                    label: "Novo produto",
                    path: "/produtos/novo",
                },
                {
                    id: "products-low-stock",
                    label: "Baixo stock",
                    path: "/produtos/baixo-stock",
                }
            ]
        },

        {
            id: "orders",
            label: "Encomendas",
            icon: BsCart2,

            children: [
                {
                    id: "orders-list",
                    label: "Lista de encomendas",
                    path: "/encomendas",
                },
                {
                    id: "orders-new",
                    label: "Nova encomenda",
                    path: "/encomendas/nova",
                },
            ],
        }
    ],


    bottom: [

        {
            id: "profile",
            label: "Perfil",
            path: "/perfil",
            icon: CiUser,
        },
    ]
}


export default menuItems





