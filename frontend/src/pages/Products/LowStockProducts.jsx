import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPackage, LuRefreshCw } from "react-icons/lu";

import { useData } from "../../context/DataContext";

import { InputField } from "../../Components/InputField/InputField";
import { Button } from "../../Components/Button/Button";
import Loading from "../../components/Loadding/Loading";

import {
    Page,
    Header,
    Title,
    Description,
    TopBar,
    ProductsContainer,
    TableWrapper,
    TableHeader,
    TableHead,
    ProductRow,
    ProductInfo,
    ProductName,
    ProductSku,
    Category,
    Price,
    Stock,
    StockWarning,
    Status,
    Action,
    MobileList,
    ProductCard,
    CardHeader,
    CardName,
    CardSku,
    CardBody,
    CardItem,
    CardLabel,
    CardValue,
    EmptyState
} from "./lowStockProducts.styles";

function formatCurrency(value) {
    return new Intl.NumberFormat("pt-MZ", {
        style: "currency",
        currency: "MZN",
    }).format(Number(value) || 0);
}

export default function LowStockProducts() {
    const navigate = useNavigate();

    const {
        products,
        loadingProducts,
        getProducts,
    } = useData();

    const [search, setSearch] = useState("");

    useEffect(() => {
        getProducts();
    }, []);

    const lowStockProducts = products.filter((product) => {
        const stock = Number(product.stock || 0);
        const threshold = Number(
            product.lowStockThreshold || 5
        );

        return stock > 0 && stock <= threshold;
    });

    const filteredProducts = lowStockProducts.filter(
        (product) => {
            const searchValue = search
                .toLowerCase()
                .trim();

            if (!searchValue) {
                return true;
            }

            return (
                product.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                product.sku
                    ?.toLowerCase()
                    .includes(searchValue) ||
                product.category
                    ?.toLowerCase()
                    .includes(searchValue)
            );
        }
    );

    const handleRefresh = () => {
        getProducts();
    };

    if (loadingProducts && products.length === 0) {
        return <Loading />;
    }

    return (
        <Page>
            <Header>
                <div>
                    <Title>Stock baixo</Title>

                    <Description>
                        Produtos que precisam de reposição.
                    </Description>
                </div>

                <Button
                    type="button"
                    text="Atualizar"
                    size="sm"
                    icon={<LuRefreshCw size={18} />}
                    onClick={handleRefresh}
                    disabled={loadingProducts}
                    width
                />
            </Header>

            <TopBar>
                <InputField
                    type="text"
                    placeholder="Pesquisar produto, SKU ou categoria"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />
            </TopBar>

            {filteredProducts.length === 0 ? (
                <ProductsContainer>
                    <EmptyState>
                        <LuPackage size={32} />

                        <strong>
                            {search
                                ? "Nenhum produto encontrado"
                                : "Nenhum produto com stock baixo"}
                        </strong>

                        <span>
                            {search
                                ? "Tente pesquisar por outro termo."
                                : "O seu stock está em boas condições."}
                        </span>
                    </EmptyState>
                </ProductsContainer>
            ) : (
                <>
                    <TableWrapper>
                        <TableHeader>
                            <TableHead>
                                Produto
                            </TableHead>

                            <TableHead>
                                SKU
                            </TableHead>

                            <TableHead>
                                Categoria
                            </TableHead>

                            <TableHead>
                                Preço
                            </TableHead>

                            <TableHead>
                                Stock
                            </TableHead>

                            <TableHead>
                                Estado
                            </TableHead>

                            <TableHead>
                                Ações
                            </TableHead>
                        </TableHeader>

                        {filteredProducts.map(
                            (product) => (
                                <ProductRow
                                    key={product._id}
                                >
                                    <ProductInfo>
                                        <ProductName>
                                            {product.name}
                                        </ProductName>
                                    </ProductInfo>

                                    <ProductSku>
                                        {product.sku}
                                    </ProductSku>

                                    <Category>
                                        {product.category ||
                                            "-"}
                                    </Category>

                                    <Price>
                                        {formatCurrency(
                                            product.price
                                        )}
                                    </Price>

                                    <StockWarning>
                                        {product.stock}
                                        {" / "}
                                        {product.lowStockThreshold ||
                                            5}
                                    </StockWarning>

                                    <Status>
                                        Stock baixo
                                    </Status>

                                    <Action>
                                        <Button
                                            type="button"
                                            text="Ver"
                                            size="sm"
                                            onClick={() =>
                                                navigate(
                                                    `/produtos/${product._id}`
                                                )
                                            }
                                        />
                                    </Action>
                                </ProductRow>
                            )
                        )}
                    </TableWrapper>

                    <MobileList>
                        {filteredProducts.map(
                            (product) => (
                                <ProductCard
                                    key={product._id}
                                    onClick={() =>
                                        navigate(
                                            `/produtos/${product._id}`
                                        )
                                    }
                                >
                                    <CardHeader>
                                        <div>
                                            <CardName>
                                                {
                                                    product.name
                                                }
                                            </CardName>

                                            <CardSku>
                                                SKU:{" "}
                                                {
                                                    product.sku
                                                }
                                            </CardSku>
                                        </div>

                                        <Status>
                                            Stock baixo
                                        </Status>
                                    </CardHeader>

                                    <CardBody>
                                        <CardItem>
                                            <CardLabel>
                                                Categoria
                                            </CardLabel>

                                            <CardValue>
                                                {product.category ||
                                                    "-"}
                                            </CardValue>
                                        </CardItem>

                                        <CardItem>
                                            <CardLabel>
                                                Preço
                                            </CardLabel>

                                            <CardValue>
                                                {formatCurrency(
                                                    product.price
                                                )}
                                            </CardValue>
                                        </CardItem>

                                        <CardItem>
                                            <CardLabel>
                                                Stock
                                            </CardLabel>

                                            <StockWarning>
                                                {
                                                    product.stock
                                                }{" "}
                                                /{" "}
                                                {product.lowStockThreshold ||
                                                    5}
                                            </StockWarning>
                                        </CardItem>
                                    </CardBody>
                                </ProductCard>
                            )
                        )}
                    </MobileList>
                </>
            )}
        </Page>
    );
}