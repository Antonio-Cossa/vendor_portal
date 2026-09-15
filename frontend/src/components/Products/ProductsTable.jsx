import { LuPencil } from "react-icons/lu";
import styled from "styled-components";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

function formatPrice(value) {
    return new Intl.NumberFormat(
        "pt-MZ",
        {
            style: "currency",
            currency: "MZN",
            minimumFractionDigits: 2,
        }
    ).format(value);
}

export default function ProductsTable({
    products,
    loading
}) {
    const navigate = useNavigate()
    const goTOProductDetails = async (id) => {
        navigate(`/produtos/${id}`)
    }

    return (
        <TableContainer>
            <TableHeader>
                <div>
                    <Title>
                        Produtos
                    </Title>

                    <Subtitle>
                        Exibindo {products.length}{" "}
                        de {products.length} produtos
                    </Subtitle>
                </div>

                <ProductCount>
                    {products.length} Produtos
                </ProductCount>
            </TableHeader>

            {loading ? (
                <Loading>
                    Carregando produtos...
                </Loading>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <span>PRODUTO</span>
                            <span>SKU</span>
                            <span>CATEGORIA</span>
                            <span>PREÇO</span>
                            <span>STOCK</span>
                            <span>ESTADO</span>
                            <span>AÇÕES</span>
                        </TableHead>

                        <TableBody>
                            {products.map((product) => (
                                <ProductRow
                                    key={product._id}
                                    onClick={() =>
                                        goTOProductDetails(product._id)
                                    }
                                >
                                    <ProductName>
                                        {product.name}
                                    </ProductName>

                                    <ProductText>
                                        {product.sku}
                                    </ProductText>

                                    <ProductText>
                                        {product.category}
                                    </ProductText>

                                    <ProductText>
                                        {formatPrice(product.price)}
                                    </ProductText>

                                    <Stock
                                        $empty={product.stock === 0}
                                    >
                                        {product.stock}
                                    </Stock>

                                    <Status $status={product.status}>
                                        {product.status === "active"
                                            ? "Ativo"
                                            : "Inativo"}
                                    </Status>

                                    <Actions>
                                        <ActionButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                goTOProductDetails(
                                                    product._id
                                                );
                                            }}
                                        >
                                            <LuPencil size={18} />
                                        </ActionButton>
                                    </Actions>
                                </ProductRow>
                            ))}

                            {!loading && products.length === 0 && (
                                <Empty>
                                    Nenhum produto encontrado.
                                </Empty>
                            )}
                        </TableBody>
                    </Table>

                    <MobileList>
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                onClick={() =>
                                    goTOProductDetails(product._id)
                                }
                            >
                                <CardHeader>
                                    <div>
                                        <ProductCardName>
                                            {product.name}
                                        </ProductCardName>

                                        <ProductCardSku>
                                            SKU: {product.sku}
                                        </ProductCardSku>
                                    </div>

                                    <Status $status={product.status}>
                                        {product.status === "active"
                                            ? "Ativo"
                                            : "Inativo"}
                                    </Status>
                                </CardHeader>

                                <CardInfo>
                                    <InfoItem>
                                        <InfoLabel>
                                            Categoria
                                        </InfoLabel>

                                        <InfoValue>
                                            {product.category}
                                        </InfoValue>
                                    </InfoItem>

                                    <InfoItem>
                                        <InfoLabel>
                                            Preço
                                        </InfoLabel>

                                        <InfoValue>
                                            {formatPrice(product.price)}
                                        </InfoValue>
                                    </InfoItem>

                                    <InfoItem>
                                        <InfoLabel>
                                            Stock
                                        </InfoLabel>

                                        <Stock
                                            $empty={
                                                product.stock === 0
                                            }
                                        >
                                            {product.stock}
                                        </Stock>
                                    </InfoItem>
                                </CardInfo>

                                <CardFooter>
                                    <span>
                                        ID: {product._id}
                                    </span>

                                    <Actions>
                                        <ActionButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                goTOProductDetails(
                                                    product._id
                                                );
                                            }}
                                        >
                                            <LuPencil size={18} />
                                        </ActionButton>
                                    </Actions>
                                </CardFooter>
                            </ProductCard>
                        ))}

                        {!loading && products.length === 0 && (
                            <Empty>
                                Nenhum produto encontrado.
                            </Empty>
                        )}
                    </MobileList>
                </>
            )}
        </TableContainer>
    );
}

const TableContainer = styled.div`
    width: 100%;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf5;

    border-radius: 28px;

    overflow: hidden;

    box-shadow:
        0 2px 5px rgba(130, 45, 93, 0.08);

    @media (max-width: 700px) {
        border-radius: 18px;
    }
`;

const TableHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 20px 24px;

    @media (max-width: 600px) {
        gap: 15px;
        align-items: flex-start;
        flex-direction: column;
    }
`;

const Title = styled.h2`
    margin: 0;

    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeight.medium};

    color: ${({ theme }) =>
        theme.colors.text};
`;

const Subtitle = styled.p`
    margin: 4px 0 0;

    font-size: 13px;

    color: #718096;
`;

const ProductCount = styled.div`
    display: flex;
    align-items: center;

    gap: 8px;

    padding: 7px 13px;

    border-radius: 20px;

    background: #f3f5f8;

    color: #536276;

    font-size: 13px;
`;

const Table = styled.div`
        width: 100%;

    @media (max-width: 700px) {
        display: none;
    }
`;

const TableHead = styled.div`
    display: grid;

    grid-template-columns:
        2fr
        1.3fr
        1.2fr
        1fr
        0.8fr
        1fr
        1fr;

    align-items: center;

    min-height: 45px;

    padding: 0 25px;

    background:  ${({ theme }) => theme.colors.primary};

    color:  ${({ theme }) => theme.colors.white};

    font-size: 11px;
    font-weight: 600;
`;

const TableBody = styled.div`
    width: 100%;
`;

const ProductRow = styled.div`
    display: grid;

    grid-template-columns:
        2fr
        1.3fr
        1.2fr
        1fr
        0.8fr
        1fr
        1fr;

    align-items: center;

    min-height: 68px;

    padding: 0 25px;

    border-bottom: 1px solid #eeeeee;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: #faf8fc;
    }
`;

const ProductName = styled.div`
    font-size: 14px;
    font-weight: 600;

    color: ${({ theme }) =>
        theme.colors.text};

    padding-right: 15px;
`;

const ProductText = styled.div`
    font-size: 13px;

    color: #536276;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    padding-right: 15px;
`;

const Stock = styled.div`
    font-size: 13px;
    font-weight: 600;

    color: ${({ $empty }) =>
        $empty ? "#e53935" : "#536276"};
`;

const Status = styled.div`
    width: fit-content;

    display: flex;
    align-items: center;

    gap: 7px;

    padding: 5px 10px;

    border-radius: 20px;

    background: ${({ $status, theme }) =>
        $status === "active"
            ? ` ${theme.colors.secondary}`
            : "#eeeeee"};

    color: ${({ $status, theme }) =>
        $status === "active"
            ? ` ${theme.colors.text}`
            : "#e53935"};
            

    font-size: 12px;
    font-weight:  ${({ theme }) => theme.fontWeight.medium};
`;


const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ActionButton = styled.button`
    width: 37px;
    height: 37px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #e1e5eb;

    border-radius: 8px;

    background: white;

    color: #536276;

    cursor: pointer;

    transition:
        background 0.2s ease,
        color 0.2s ease;

    &:hover {
        background: #f5effa;

        color:  ${({ theme }) => theme.colors.primary};
    }
`;

const Loading = styled.div`
    min-height: 200px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #718096;

    font-size: 14px;
`;

const Empty = styled.div`
    grid-column: 1 / -1;

    min-height: 150px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #718096;

    font-size: 14px;
`;

const MobileList = styled.div`
    display: none;

    @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
    }
`;

const ProductCard = styled.div`
    background: ${({ theme }) => theme.colors.white};

    border: 1px solid #eadcf5;
    border-radius: 16px;

    padding: 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    cursor: pointer;

    transition:
        box-shadow 0.2s ease,
        transform 0.2s ease;

    &:hover {
        box-shadow:
            0 4px 12px rgba(130, 45, 93, 0.08);
    }

    &:active {
        transform: scale(0.99);
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    gap: 12px;
`;

const ProductCardName = styled.div`
    font-size: 15px;
    font-weight: 600;

    color: ${({ theme }) =>
        theme.colors.text};

    line-height: 1.4;
`;

const ProductCardSku = styled.div`
    margin-top: 4px;

    color: #718096;

    font-size: 12px;
`;

const CardInfo = styled.div`
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 10px;

    padding-top: 4px;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;

    min-width: 0;
`;

const InfoLabel = styled.span`
    color: #718096;

    font-size: 10px;
    font-weight: 500;

    text-transform: uppercase;
`;

const InfoValue = styled.span`
    color: ${({ theme }) =>
        theme.colors.text};

    font-size: 13px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-top: 12px;

    border-top: 1px solid #eeeeee;

    span {
        max-width: 70%;

        color: #9aa4b2;

        font-size: 10px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
