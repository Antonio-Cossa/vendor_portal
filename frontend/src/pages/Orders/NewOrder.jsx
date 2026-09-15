import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import {
    LuArrowLeft,
    LuSave,
    LuPlus,
    LuTrash2,
} from "react-icons/lu";

import { useData } from "../../context/DataContext";

import { Button } from "../../Components/Button/Button";
import { InputField } from "../../Components/InputField/InputField";

import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";

import Loading from "../../components/Loadding/Loading";


export default function NewOrder() {
    const navigate = useNavigate();
    const {
        products,
        loadingProducts,
        getProducts,
        createOrder,
    } = useData();
    const [orderName, setOrderName] = useState("");
    const [items, setItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getProducts({
            status: "active",
            limit: 100,
        });
    }, []);

    const handleAddProduct = () => {
        if (!selectedProduct) {
            toast.error("Selecione um produto");
            return;
        }
        const product = products.find(
            product => product._id === selectedProduct
        );
        if (!product) {
            toast.error("Produto não encontrado");
            return;
        }
        if (quantity < 1) {
            toast.error("A quantidade deve ser maior que zero");
            return;
        }
        if (quantity > product.stock) {
            toast.error("Quantidade superior ao stock disponível");
            return;
        }
        const existingProduct = items.find(
            item => item._id === product._id
        );
        if (existingProduct) {
            const newQuantity =
                existingProduct.quantity + Number(quantity);
            if (newQuantity > product.stock) {
                toast.error("Quantidade superior ao stock disponível");
                return;
            }
            setItems(prev =>
                prev.map(item =>
                    item._id === product._id
                        ? {
                            ...item,
                            quantity: newQuantity
                        }
                        : item
                )
            );
        } else {
            setItems(prev => [
                ...prev,
                {
                    _id: product._id,
                    name: product.name,
                    quantity: Number(quantity)
                }
            ]);
        }
        setSelectedProduct("");
        setQuantity(1);
    };
    const handleQuantityChange = (productId, newQuantity) => {
        const product = products.find(
            product => product._id === productId
        );
        if (!product) return;
        const quantity = Number(newQuantity);
        if (quantity < 1) {
            return;
        }
        if (quantity > product.stock) {
            toast.error("Quantidade superior ao stock disponível");
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item._id === productId
                    ? {
                        ...item,
                        quantity
                    }
                    : item
            )
        );
    };
    const handleIncrease = (productId) => {
        const item = items.find(
            item => item._id === productId
        );
        if (!item) return;
        handleQuantityChange(
            productId,
            item.quantity + 1
        );
    };
    const handleDecrease = (productId) => {
        const item = items.find(
            item => item._id === productId
        );
        if (!item) return;
        if (item.quantity <= 1) {
            return;
        }
        handleQuantityChange(
            productId,
            item.quantity - 1
        );
    };
    const handleRemoveProduct = (productId) => {
        setItems(prev =>
            prev.filter(item => item._id !== productId)
        );
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        if (!orderName.trim()) {
            toast.error("Informe o nome da encomenda");
            return;
        }
        if (items.length === 0) {
            toast.error("Adicione pelo menos um produto");
            return;
        }
        try {
            setSaving(true);
            const payload = {
                orderName: orderName.trim(),
                items
            };
            const result = await createOrder(payload);
            toast.success(result.message);
            navigate(`/encomendas/${result.order._id}`);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    if (loadingProducts) {
        return <Loading />;
    }

    return (
        <Page>
            <Header>
                <BackButton
                    type="button"
                    onClick={() =>
                        navigate(
                            "/encomendas"
                        )
                    }
                >
                    <LuArrowLeft
                        size={20}
                    />
                    Encomendas
                </BackButton>
            </Header>

            <Content>
                <Card>
                    <Form
                        onSubmit={
                            handleCreateOrder
                        }
                    >
                        <Title>
                            Nova encomenda
                        </Title>

                        <Field>
                            <Label>
                                Nome da encomenda
                            </Label>
                            <InputField
                                type="text"
                                placeholder="Nome da encomenda"
                                value={orderName}
                                onChange={(e) =>
                                    setOrderName(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </Field>

                        <ItemsSection>
                            <SectionTitle>
                                Produtos
                            </SectionTitle>

                            <AddItem>
                                <ProductSelect
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                >
                                    <option value="">
                                        Selecionar produto
                                    </option>
                                    {products.map((product) => (
                                        <option
                                            key={product._id}
                                            value={product._id}
                                            disabled={product.stock <= 0}
                                        >
                                            {product.name} | Stock: {product.stock}
                                        </option>
                                    ))}
                                </ProductSelect>

                                <QuantityField>
                                    <InputField
                                        type="number"
                                        min="1"
                                        placeholder="Qtd."
                                        value={
                                            quantity
                                        }
                                        onChange={(e) =>
                                            setQuantity(
                                                e.target.value
                                            )
                                        }
                                    />
                                </QuantityField>

                                <Button
                                    type="button"
                                    icon={
                                        <LuPlus
                                            size={18}
                                        />
                                    }
                                    text="Adicionar"
                                    size="sm"
                                    onClick={
                                        handleAddProduct
                                    }
                                />
                            </AddItem>

                            {items.length > 0 && (
                                <ItemsList>
                                    {items.map((item) => {
                                        const product = products.find(
                                            product => product._id === item._id
                                        );
                                        return (
                                            <Item key={item._id}>
                                                <ItemInfo>
                                                    <ItemName>
                                                        {item.name}
                                                    </ItemName>
                                                    <ItemStock>
                                                        Stock disponível:{" "}
                                                        {product?.stock ?? "-"}
                                                    </ItemStock>
                                                </ItemInfo>
                                                <QuantityControls>
                                                    <QuantityButton
                                                        type="button"
                                                        onClick={() =>
                                                            handleDecrease(item._id)
                                                        }
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        −
                                                    </QuantityButton>
                                                    <QuantityValue>
                                                        {item.quantity}
                                                    </QuantityValue>
                                                    <QuantityButton
                                                        type="button"
                                                        onClick={() =>
                                                            handleIncrease(item._id)
                                                        }
                                                        disabled={
                                                            item.quantity >=
                                                            (product?.stock ?? 0)
                                                        }
                                                    >
                                                        +
                                                    </QuantityButton>
                                                </QuantityControls>
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveProduct(item._id)
                                                    }
                                                    icon={<LuTrash2 size={18} />}
                                                    background="#ef4444"
                                                    size="sm"
                                                    width
                                                />
                                            </Item>
                                        );
                                    })}
                                </ItemsList>
                            )}

                            {items.length === 0 && (
                                <Empty>
                                    Nenhum produto
                                    adicionado.
                                </Empty>
                            )}
                        </ItemsSection>

                        <Actions>
                            <Button
                                type="button"
                                text="Cancelar"
                                size="sm"
                                onClick={() =>
                                    navigate(
                                        "/encomendas"
                                    )
                                }
                            />

                            <Button
                                type="submit"
                                disabled={
                                    saving ||
                                    items.length === 0
                                }
                                icon={
                                    <LuSave
                                        size={18}
                                    />
                                }
                                text={
                                    saving
                                        ? "Salvando..."
                                        : "Salvar"
                                }
                                size="sm"
                            />
                        </Actions>
                    </Form>
                </Card>
            </Content>
        </Page >
    );
}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) =>
        theme.spacing.md};
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: transparent;
    color: ${({ theme }) =>
        theme.colors.text};
        cursor: pointer;
        font-size: ${({ theme }) =>
        theme.fontSizes.md};
        &:hover {
        color: ${({ theme }) =>
        theme.colors.primary};
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) =>
        theme.spacing.md};
`;

const Card = styled.section`
    width: 100%;
    box-sizing: border-box;
    background: ${({ theme }) =>
        theme.colors.white};
        border: 1px solid #eee;
        border-radius: 18px;
        overflow: hidden;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    @media (max-width: 600px) {
        padding: 16px;
    }
`;

const Title = styled.h1`
    margin: 0;
    color: ${({ theme }) =>
        theme.colors.text};
        font-size: ${({ theme }) =>
        theme.fontSizes.xl};
`;

const Label = styled.span`
    display: block;
    margin-bottom: 5px;
    color: #64748b;
    font-size: 11px;
    font-weight: ${({ theme }) =>
        theme.fontWeight.medium};
        letter-spacing: 0.5px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

const ItemsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const SectionTitle = styled.h2`
    margin: 0;
    color: ${({ theme }) =>
        theme.colors.text};
        font-size: ${({ theme }) =>
        theme.fontSizes.lg};
`;

const AddItem = styled.div`
    display: grid;
    grid-template-columns:
        minmax(0, 1fr)
        120px
        auto;
        gap: 12px;
        align-items: end;
        @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const ProductSelect = styled.select`
    width: 100%;
    height: 42px;
    padding: 0 12px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: ${({ theme }) =>
        theme.colors.white};
        color: ${({ theme }) =>
        theme.colors.text};
        outline: none;
        &:focus {
        border-color: ${({ theme }) =>
        theme.colors.primary};
    }
`;

const QuantityField = styled.div`
    min-width: 0;
`;

const ItemsList = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    border-radius: 12px;
    overflow: hidden;
    gap: 10px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid #eee;
    gap: 20px;
    border: 1px solid #eee;
    border-radius: 12px;
    background: ${({ theme }) =>
        theme.colors.white};
    &:last-child {
        border-bottom: none;
    }
    @media (max-width: 500px) {
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 12px;
    }
`;

const ItemInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

const ItemName = styled.div`

        color: ${({ theme }) =>
        theme.colors.text};
        font-size: ${({ theme }) =>
        theme.fontSizes.md};
        font-weight: ${({ theme }) =>
        theme.fontWeight.medium};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
`;

const ItemStock = styled.div`
    margin-top: 4px;
    color: ${({ theme }) =>
        theme.colors.gray};
        font-size: ${({ theme }) =>
        theme.fontSizes.sm};
`;

const ItemQuantity = styled.div`
    min-width: 45px;
    padding: 6px 10px;
    text-align: center;
    border-radius: 8px;
    background: #f5f5f5;
    color: ${({ theme }) =>
        theme.colors.text};
        font-weight: ${({ theme }) =>
        theme.fontWeight.medium};
`;


const Empty = styled.div`
    padding: 30px;
    text-align: center;
    border: 1px dashed #ddd;
    border-radius: 12px;
    color: ${({ theme }) =>
        theme.colors.gray};
        font-size: ${({ theme }) =>
        theme.fontSizes.sm};
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 4px;
    @media (max-width: 500px) {
        flex-direction: column-reverse;
            button {
            width: 100%;
        }
    }
`;


const QuantityControls = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 4px;
`;

const QuantityButton = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 7px;
    background: ${({ theme }) =>
        theme.colors.background};
        color: ${({ theme }) =>
        theme.colors.text};
        font-size: 18px;
        cursor: pointer;
        &:hover:not(:disabled) {
        background: #eee;
    }
    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const QuantityValue = styled.span`
    min-width: 30px;
    text-align: center;
    font-weight: 600;
`;