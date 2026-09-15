import styled from "styled-components";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Loading from "../Loadding/Loading";

export default function OrdersTable({
    orders = [],
    loading = false,
}) {
    const navigate = useNavigate();

    function formatCurrency(value) {
        return new Intl.NumberFormat(
            "pt-MZ",
            {
                style: "currency",
                currency: "MZN",
            }
        ).format(value || 0);
    }

    function formatDate(value) {
        if (!value) return "-";

        return new Date(value).toLocaleString(
            "pt-MZ",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    }

    function formatStatus(status) {
        const labels = {
            pending: "Pendente",
            confirmed: "Confirmada",
            processing: "Em processamento",
            shipped: "Enviada",
            delivered: "Entregue",
            cancelled: "Cancelada",
        };

        return labels[status] || status;
    }
    if (loading) {
        return (
            <Container>
                <Loading />
            </Container>
        );
    }

    return (
        <Container>

            <TableHeader>
                <div>
                    <Title>Encomendas</Title>

                    <Subtitle>
                        Exibindo {orders.length} de{" "}
                        {orders.length} encomendas
                    </Subtitle>
                </div>

                <Count>
                    {orders.length} encomendas
                </Count>
            </TableHeader>

            {orders.length === 0 ? (
                <Empty>
                    Nenhuma encomenda encontrada.
                </Empty>
            ) : (
                <>
                    <DesktopTable>
                        <TableWrapper>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>NOME</th>
                                        <th>PRODUTOS</th>
                                        <th>TOTAL</th>
                                        <th>STATUS</th>
                                        <th>DATA DE CRIAÇÃO</th>
                                        <th>AÇÕES</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} onClick={() =>
                                            navigate(
                                                `/encomendas/${order._id}`
                                            )
                                        }>
                                            <td>
                                                <OrderName>
                                                    {order.orderName ||
                                                        "Sem nome"}
                                                </OrderName>

                                                <OrderId>
                                                    #{order._id}
                                                </OrderId>
                                            </td>

                                            <td>
                                                {order.items?.length || 0}
                                            </td>

                                            <td>
                                                {formatCurrency(
                                                    order.total
                                                )}
                                            </td>

                                            <td>
                                                <Status
                                                    $status={
                                                        order.status
                                                    }
                                                >
                                                    {formatStatus(
                                                        order.status
                                                    )}
                                                </Status>
                                            </td>

                                            <td>
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </td>

                                            <td>
                                                <Actions>
                                                    <ActionButton
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/encomendas/${order._id}`
                                                            )
                                                        }
                                                    >
                                                        <LuEye
                                                            size={18}
                                                        />
                                                    </ActionButton>
                                                </Actions>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </TableWrapper>
                    </DesktopTable>

                    <MobileCards>
                        {orders.map((order) => (
                            <OrderCard key={order._id}>

                                <CardTop>
                                    <div>
                                        <CardOrderName>
                                            {order.orderName ||
                                                "Sem nome"}
                                        </CardOrderName>

                                        <OrderId>
                                            #{order._id}
                                        </OrderId>
                                    </div>

                                    <Status
                                        $status={
                                            order.status
                                        }
                                    >
                                        {formatStatus(
                                            order.status
                                        )}
                                    </Status>
                                </CardTop>

                                <CardInfo>

                                    <InfoItem>
                                        <InfoLabel>
                                            Produtos
                                        </InfoLabel>

                                        <InfoValue>
                                            {order.items?.length || 0}
                                        </InfoValue>
                                    </InfoItem>

                                    <InfoItem>
                                        <InfoLabel>
                                            Total
                                        </InfoLabel>

                                        <InfoValue>
                                            {formatCurrency(
                                                order.total
                                            )}
                                        </InfoValue>
                                    </InfoItem>

                                    <InfoItem>
                                        <InfoLabel>
                                            Data de criação
                                        </InfoLabel>

                                        <InfoValue>
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </InfoValue>
                                    </InfoItem>

                                </CardInfo>

                                <CardBottom>
                                    <ActionButton
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/encomendas/${order._id}`
                                            )
                                        }
                                    >
                                        <LuEye size={18} />
                                        Ver encomenda
                                    </ActionButton>
                                </CardBottom>

                            </OrderCard>
                        ))}
                    </MobileCards>
                </>
            )}
        </Container>
    );
}



const Container = styled.section`
    width: 100%;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf5;

    border-radius: 18px;

    overflow: hidden;

    box-sizing: border-box;
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

    font-size: ${({ theme }) =>
        theme.fontSizes.lg};

    color: ${({ theme }) =>
        theme.colors.text};
`;

const Subtitle = styled.p`
    margin: 4px 0 0;

    color: #64748b;

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};
`;

const Count = styled.div`
    display: flex;
    align-items: center;

    padding: 7px 13px;

    background: #f1f5f9;

    border-radius: 20px;

    color: #475569;

    font-size: 13px;
`;


const DesktopTable = styled.div`
    display: block;

    @media (max-width: 768px) {
        display: none;
    }
`;

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;

    border-collapse: collapse;

    min-width: 850px;

    th {
        padding: 14px 24px;

        text-align: left;

        background: ${({ theme }) =>
        theme.colors.primary};

        color: white;

        font-size: 12px;

        font-weight: 600;
    }

    td {
        padding: 18px 24px;

        border-bottom: 1px solid #eee;

        color: #334155;

        font-size: 14px;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    tbody tr:hover {
        background: #fafafa;
    }
`;



const MobileCards = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;

        flex-direction: column;

        gap: 12px;

        padding: 12px;
    }
`;

const OrderCard = styled.article`
    width: 100%;

    box-sizing: border-box;

    padding: 16px;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf5;

    border-radius: 14px;

    box-shadow:
        0 2px 5px rgba(130, 45, 93, 0.05);
`;

const CardTop = styled.div`
    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 12px;

    padding-bottom: 14px;

    border-bottom: 1px solid #f1f1f1;
`;

const CardOrderName = styled.div`
    font-size: 15px;

    font-weight: 600;

    color: ${({ theme }) =>
        theme.colors.text};

    word-break: break-word;
`;

const CardInfo = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 14px;

    padding: 16px 0;

    @media (max-width: 400px) {
        grid-template-columns: 1fr;
    }
`;

const InfoItem = styled.div`
    display: flex;

    flex-direction: column;

    gap: 4px;
`;

const InfoLabel = styled.span`
    color: #94a3b8;

    font-size: 11px;

    text-transform: uppercase;

    letter-spacing: 0.4px;
`;

const InfoValue = styled.span`
    color: #334155;

    font-size: 14px;

    font-weight: 500;

    word-break: break-word;
`;

const CardBottom = styled.div`
    display: flex;

    justify-content: flex-end;

    padding-top: 12px;

    border-top: 1px solid #f1f1f1;
`;


const OrderName = styled.div`
    font-weight: 600;

    color: ${({ theme }) =>
        theme.colors.text};
`;

const OrderId = styled.div`
    margin-top: 4px;

    color: #94a3b8;

    font-size: 11px;

    max-width: 180px;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;
`;

const Status = styled.span`
    display: inline-flex;

    align-items: center;

    padding: 6px 12px;

    border-radius: 20px;

    font-size: 12px;

    font-weight: 600;

    white-space: nowrap;

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

const Actions = styled.div`
    display: flex;

    align-items: center;

    gap: 8px;
`;

const ActionButton = styled.button`
    min-height: 38px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 7px;

    padding: 0 12px;

    border: 1px solid #e2e8f0;

    border-radius: 9px;

    background: white;

    color: ${({ theme }) =>
        theme.colors.primary};

    cursor: pointer;

    transition: 0.2s ease;

    &:hover {
        background: #faf5ff;

        border-color: ${({ theme }) =>
        theme.colors.primary};
    }
`;

const Empty = styled.div`
    padding: 50px 20px;

    text-align: center;

    color: #94a3b8;
`;