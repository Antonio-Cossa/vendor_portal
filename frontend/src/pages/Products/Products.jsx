import { useEffect, useState } from "react";

import Filter from "../../components/Filter/Filter";
import { InputField } from "../../Components/InputField/InputField";
import { Button } from "../../Components/Button/Button";

import { LuPackagePlus } from "react-icons/lu";
import { LuEye, LuPencil } from "react-icons/lu";

import styled from "styled-components";

import { useData } from "../../context/DataContext";
import ProductsTable from "../../components/Products/ProductsTable";
import { useNavigate } from "react-router-dom";

const possibleStatus = [
    {
        label: "Todos",
        value: "all",
    },
    {
        label: "Ativos",
        value: "active",
    },
    {
        label: "Inativos",
        value: "inactive",
    },
];

function TopBar({
    filter,
    setFilter,
    search,
    setSearch,
}) {

    const navigate = useNavigate()
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
                text="Novo Produto"
                size="sm"
                width
                onClick={() => navigate("/produtos/novo")}
            />
        </TopBarWrapper>
    );
}

export default function Products() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const {
        products,
        loadingProducts,
        productPagination,
        getProducts,
    } = useData();


    useEffect(() => {
        const timer = setTimeout(() => {
            getProducts({
                page: 1,
                limit: 10,
                status: filter,
                search,
            });
        }, 400);

        return () => clearTimeout(timer);
    }, [filter, search]);

    return (
        <Page>
            <TopBar
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
            />

            <ProductsTable
                products={products}
                loading={loadingProducts}
                pagination={productPagination}
            />
        </Page>
    );
}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TopBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;


        @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
        width: 100%;
    }
`;


