import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {
    LuArrowLeft,
    LuSave,
    LuPencil,
} from "react-icons/lu";

import { useData } from "../../context/DataContext";
import { Button } from "../../Components/Button/Button";
import Loading from "../../components/Loadding/Loading";

import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";

const statusLabels = {
    pending: "Pendente",
    confirmed: "Confirmada",
    processing: "Em processamento",
    shipped: "Enviada",
    delivered: "Entregue",
    cancelled: "Cancelada",
};

const orderStatusFlow = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["processing"],
    processing: ["shipped"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
};

function formatCurrency(value) {
    return new Intl.NumberFormat("pt-MZ", {
        style: "currency",
        currency: "MZN",
        minimumFractionDigits: 2,
    }).format(value || 0);
}

function formatDate(value) {
    if (!value) return "-";

    return new Date(value).toLocaleString("pt-MZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function OrderDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        getOrder,
        updateOrderStatus,
        confirmOrder,
    } = useData();

    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        async function fetchOrder() {
            try {
                setLoading(true);

                const result = await getOrder(id);

                setOrder(result.order);
                setStatus(result.order.status);
            } catch (e) {
                toast.error(getErrorMessage(e));
                navigate("/encomendas");
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!order) {
        return null;
    }

    const availableStatuses =
        orderStatusFlow[order.status] || [];

    const handleSave = async (e) => {
        e.preventDefault();

        if (status === order.status) {
            setEditing(false);
            return;
        }

        try {
            setSaving(true);

            let result;

            if (
                order.status === "pending" &&
                status === "confirmed"
            ) {
                result = await confirmOrder(order._id);
            } else {
                result = await updateOrderStatus(
                    order._id,
                    status
                );
            }

            const refreshed = await getOrder(order._id);

            setOrder(refreshed.order);
            setStatus(refreshed.order.status);
            setEditing(false);

            toast.success(
                result?.message ||
                "Status atualizado com sucesso"
            );

        } catch (e) {
            setStatus(order.status);
            toast.error(getErrorMessage(e));
        } finally {
            setSaving(false);
        }
    };

    const cancelEdit = () => {
        setStatus(order.status);
        setEditing(false);
    };

    return (
        <Page>
            <Header>
                <BackButton
                    type="button"
                    onClick={() =>
                        navigate("/encomendas")
                    }
                >
                    <LuArrowLeft size={20} />
                    Encomendas
                </BackButton>

                {!editing &&
                    availableStatuses.length > 0 && (
                        <Button
                            type="button"
                            icon={<LuPencil size={18} />}
                            text="Editar"
                            width
                            size="sm"
                            onClick={() =>
                                setEditing(true)
                            }
                        />
                    )}
            </Header>

            <Content>
                <Card>
                    <CardHeader>
                        <div>
                            <Title>
                                {order.orderName ||
                                    "Sem nome"}
                            </Title>

                            <OrderId>
                                #{order._id}
                            </OrderId>
                        </div>

                        <Status
                            $status={order.status}
                        >
                            {statusLabels[
                                order.status
                            ] || order.status}
                        </Status>
                    </CardHeader>

                    <InfoGrid>
                        <Info>
                            <Label>
                                Data de criação
                            </Label>

                            <Value>
                                {formatDate(
                                    order.createdAt
                                )}
                            </Value>
                        </Info>

                        <Info>
                            <Label>
                                Última atualização
                            </Label>

                            <Value>
                                {formatDate(
                                    order.updatedAt
                                )}
                            </Value>
                        </Info>

                        <Info>
                            <Label>
                                Total
                            </Label>

                            <Value>
                                {formatCurrency(
                                    order.total
                                )}
                            </Value>
                        </Info>

                        {order.confirmedAt && (
                            <Info>
                                <Label>
                                    Confirmada em
                                </Label>

                                <Value>
                                    {formatDate(
                                        order.confirmedAt
                                    )}
                                </Value>
                            </Info>
                        )}
                    </InfoGrid>
                </Card>

                <Card>
                    <SectionHeader>
                        <div>
                            <SectionTitle>
                                Produtos
                            </SectionTitle>

                            <SectionSubtitle>
                                {order.items?.length || 0}{" "}
                                produtos nesta encomenda
                            </SectionSubtitle>
                        </div>
                    </SectionHeader>

                    <Items>
                        {order.items?.map((item) => (
                            <Item key={item.productId}>
                                <ItemInfo>
                                    <ItemName>
                                        {item.productName}
                                    </ItemName>

                                    <ItemSku>
                                        SKU: {item.sku}
                                    </ItemSku>
                                </ItemInfo>

                                <ItemQuantity>
                                    <Label>
                                        Quantidade
                                    </Label>

                                    <Value>
                                        {item.quantity}
                                    </Value>
                                </ItemQuantity>

                                <ItemPrice>
                                    <Label>
                                        Preço unitário
                                    </Label>

                                    <Value>
                                        {formatCurrency(
                                            item.unitPrice
                                        )}
                                    </Value>
                                </ItemPrice>

                                <ItemSubtotal>
                                    <Label>
                                        Subtotal
                                    </Label>

                                    <Value>
                                        {formatCurrency(
                                            item.subTotal
                                        )}
                                    </Value>
                                </ItemSubtotal>
                            </Item>
                        ))}
                    </Items>

                    <TotalRow>
                        <span>Total da encomenda</span>

                        <strong>
                            {formatCurrency(
                                order.total
                            )}
                        </strong>
                    </TotalRow>
                </Card>

                {editing && (
                    <Card>
                        <Form onSubmit={handleSave}>
                            <Field>
                                <Label>
                                    Novo estado
                                </Label>

                                <Select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(
                                            e.target.value
                                        )
                                    }
                                    disabled={saving}
                                >
                                    <option
                                        value={order.status}
                                    >
                                        {statusLabels[
                                            order.status
                                        ]}
                                    </option>

                                    {availableStatuses.map(
                                        (nextStatus) => (
                                            <option
                                                key={
                                                    nextStatus
                                                }
                                                value={
                                                    nextStatus
                                                }
                                            >
                                                {
                                                    statusLabels[
                                                    nextStatus
                                                    ]
                                                }
                                            </option>
                                        )
                                    )}
                                </Select>
                            </Field>

                            <Actions>
                                <Button
                                    type="button"
                                    text="Cancelar"
                                    size="sm"
                                    disabled={saving}
                                    onClick={
                                        cancelEdit
                                    }
                                />

                                <Button
                                    type="submit"
                                    disabled={saving}
                                    icon={
                                        <LuSave
                                            size={18}
                                        />
                                    }
                                    text="Salvar"
                                    size="sm"
                                />
                            </Actions>
                        </Form>
                    </Card>
                )}
            </Content>
        </Page>
    );
}


const Page = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 600px) {
        align-items: flex-start;
    }
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
    gap: ${({ theme }) => theme.spacing.md};
`;

const Card = styled.section`
    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eee;
    border-radius: 18px;
    overflow: hidden;
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 24px;

    border-bottom: 1px solid #eee;

    @media (max-width: 600px) {
        align-items: flex-start;
        flex-direction: column;
        gap: 15px;
    }
`;

const Title = styled.h1`
    margin: 0;

    font-size: ${({ theme }) =>
        theme.fontSizes.lg};

    color: ${({ theme }) =>
        theme.colors.text};
`;

const OrderId = styled.div`
    margin-top: 5px;

    color: #94a3b8;
    font-size: 12px;

    word-break: break-all;
`;

const InfoGrid = styled.div`
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 20px;

    padding: 24px;

    @media (max-width: 900px) {
        grid-template-columns:
            repeat(2, 1fr);
    }

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Label = styled.span`
    color: #64748b;

    font-size: 11px;
    font-weight: 600;

    text-transform: uppercase;
`;

const Value = styled.span`
    color: ${({ theme }) =>
        theme.colors.text};

    font-size: 14px;
    font-weight: 600;
`;

const Status = styled.span`
    display: inline-flex;

    padding: 6px 12px;

    border-radius: 20px;

    font-size: 12px;
    font-weight: 600;

    background: ${({ $status }) => {
        if ($status === "cancelled") {
            return "#fee2e2";
        }

        if ($status === "delivered") {
            return "#dcfce7";
        }

        if ($status === "processing") {
            return "#fef3c7";
        }

        return "#f3e8ff";
    }};

    color: ${({ $status }) => {
        if ($status === "cancelled") {
            return "#dc2626";
        }

        if ($status === "delivered") {
            return "#16a34a";
        }

        if ($status === "processing") {
            return "#d97706";
        }

        return "#9333ea";
    }};
`;

const SectionHeader = styled.div`
    padding: 20px 24px;

    border-bottom: 1px solid #eee;
`;

const SectionTitle = styled.h2`
    margin: 0;

    font-size: ${({ theme }) =>
        theme.fontSizes.md};

    color: ${({ theme }) =>
        theme.colors.text};
`;

const SectionSubtitle = styled.p`
    margin: 4px 0 0;

    color: #64748b;
    font-size: 13px;
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
`;

const Item = styled.div`
    display: grid;

    grid-template-columns:
        2fr
        1fr
        1.2fr
        1.2fr;

    align-items: center;

    gap: 20px;

    padding: 18px 24px;

    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 450px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
`;

const ItemInfo = styled.div`
    min-width: 0;
`;

const ItemName = styled.div`
    color: ${({ theme }) =>
        theme.colors.text};

    font-size: 14px;
    font-weight: 600;

    overflow: hidden;
    text-overflow: ellipsis;
`;

const ItemSku = styled.div`
    margin-top: 4px;

    color: #94a3b8;
    font-size: 11px;
`;

const ItemQuantity = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const ItemPrice = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const ItemSubtotal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const TotalRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 20px 24px;

    background: #fafafa;

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: 14px;

    strong {
        font-size: 17px;
    }

    @media (max-width: 450px) {
        gap: 15px;
        align-items: flex-start;
        flex-direction: column;
    }
`;

const Form = styled.form`
    display: flex;
    align-items: flex-end;

    gap: 20px;

    padding: 24px;

    @media (max-width: 600px) {
        align-items: stretch;
        flex-direction: column;
    }
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;

    gap: 7px;

    flex: 1;
`;

const Select = styled.select`
    width: 100%;

    min-height: 42px;

    padding: 0 12px;

    border: 1px solid #e2e8f0;
    border-radius: 8px;

    background: ${({ theme }) =>
        theme.colors.white};

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: 14px;

    outline: none;

    cursor: pointer;

    &:focus {
        border-color: ${({ theme }) =>
        theme.colors.primary};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

const Actions = styled.div`
    display: flex;
    gap: 10px;

    @media (max-width: 600px) {
        width: 100%;

        button {
            flex: 1;
        }
    }
`;