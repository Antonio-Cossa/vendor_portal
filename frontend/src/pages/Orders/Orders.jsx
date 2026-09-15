import { useEffect, useState } from "react";
import styled from "styled-components";
import { LuEye, LuPackagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import Filter from "../../components/Filter/Filter";
import { InputField } from "../../Components/InputField/InputField";
import { Button } from "../../Components/Button/Button";
import { useData } from "../../context/DataContext";
import OrdersTable from "../../components/Orders/OrdersTable";

const possibleStatus = [
    {
        label: "Todos",
        value: "all",
    },
    {
        label: "Pendentes",
        value: "pending",
    },
    {
        label: "Confirmadas",
        value: "confirmed",
    },
    {
        label: "Em processamento",
        value: "processing",
    },
    {
        label: "Enviadas",
        value: "shipped",
    },
    {
        label: "Entregues",
        value: "delivered",
    },
    {
        label: "Canceladas",
        value: "cancelled",
    },
];

function TopBar({
    filter,
    setFilter,
    search,
    setSearch,
}) {
    const navigate = useNavigate();

    return (
        <TopBarWrapper>
            <Filter
                name="Estado"
                id="estado"
                possibleStatus={possibleStatus}
                onChange={(e) =>
                    setFilter(e.target.value)
                }
            />

            <InputField
                type="text"
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                width
                value={search}
                placeholder="Pesquisar Nome, ID"
            />

            <Button
                icon={<LuPackagePlus size={25} />}
                text="Nova Encomenda"
                size="sm"
                width
                onClick={() => navigate("/encomendas/nova")}
            />
        </TopBarWrapper>
    );
}

export default function Orders() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const {
        orders,
        loadingOrders,
        getOrders,
    } = useData();

    useEffect(() => {
        getOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        const matchesStatus =
            filter === "all" ||
            order.status === filter;

        const searchValue =
            search.toLowerCase();

        const matchesSearch =
            order.orderName
                ?.toLowerCase()
                .includes(searchValue) ||
            order._id
                ?.toLowerCase()
                .includes(searchValue);

        return matchesStatus && matchesSearch;
    });

    return (
        <Page>
            <TopBar
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
            />

            <OrdersTable
                orders={filteredOrders}
                loading={loadingOrders}
            />
        </Page>
    );
}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const TopBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;

    > div:nth-child(2) {
        flex: 1;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }
`;