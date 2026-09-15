import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    LuPackage,
    LuBoxes,
    LuTriangleAlert,
    LuCircleX,
    LuShoppingBag,
    LuClock3,
    LuCheck,
    LuTruck,
    LuCircleCheck,
    LuRefreshCw,
    LuArrowRight,
} from "react-icons/lu";

import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

import { Button } from "../Components/Button/Button"; 
import Loading from "../components/Loadding/Loading"; 

import {
    Page,
    Header,
    Greeting,
    GreetingSmall,
    GreetingTitle,
    HeaderActions,
    StatsGrid,
    StatCard,
    StatIcon,
    StatContent,
    StatLabel,
    StatValue,
    StatDescription,
    Section,
    SectionHeader,
    SectionTitle,
    SectionDescription,
    OrdersGrid,
    OrderStatusCard,
    StatusHeader,
    StatusName,
    StatusValue,
    BottomGrid,
    SummaryCard,
    SummaryValue,
    SummaryLabel,
    OrdersTable,
    TableHeader,
    TableRow,
    EmptyState,
} from "./Dashboard/styles";


function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "bom dia";
    }

    if (hour < 18) {
        return "boa tarde";
    }

    return "boa noite";
}

export default function Dashboard() {
    const navigate = useNavigate();

    const { vendor } = useAuth();

    const {
        products,
        orders,
        loadingProducts,
        loadingOrders,
        getProducts,
        getOrders,
    } = useData();

    useEffect(() => {
        getProducts();
        getOrders();
    }, []);

    const loading = loadingProducts || loadingOrders;

    const stats = useMemo(() => {
        const activeProducts = products.filter(
            (product) => product.status === "active"
        );

        const lowStock = products.filter(
            (product) =>
                product.stock > 0 &&
                product.stock <= (product.lowStockThreshold || 5)
        );

        const outOfStock = products.filter(
            (product) => product.stock === 0
        );

        const stockValue = products.reduce(
            (total, product) =>
                total + product.price * product.stock,
            0
        );

        const pending = orders.filter((order) => order.status === "pending");
        const confirmed = orders.filter((order) => order.status === "confirmed");
        const processing = orders.filter((order) => order.status === "processing");
        const shipped = orders.filter((order) => order.status === "shipped");
        const delivered = orders.filter((order) => order.status === "delivered");
        const cancelled = orders.filter((order) => order.status === "cancelled");

        const validOrders = orders.filter(
            (order) => order.status !== "cancelled"
        );

        const sales = validOrders.reduce(
            (total, order) =>
                total + Number(order.total || 0),
            0
        );

        const averageOrder =
            validOrders.length > 0
                ? sales / validOrders.length
                : 0;

        return {
            totalProducts: products.length,
            activeProducts: activeProducts.length,
            lowStock: lowStock.length,
            outOfStock: outOfStock.length,
            stockValue,

            pending: pending.length,
            confirmed: confirmed.length,
            processing: processing.length,
            shipped: shipped.length,
            delivered: delivered.length,
            cancelled: cancelled.length,

            totalOrders: orders.length,
            sales,
            averageOrder,
        };
    }, [products, orders]);

    const latestOrders = useMemo(() => {
        return [...orders]
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0, 5);
    }, [orders]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("pt-MZ", {
            style: "currency",
            currency: "MZN",
        }).format(value || 0);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
            "pt-PT"
        );
    };

    const statusLabels = {
        pending: "Pendente",
        confirmed: "Confirmada",
        processing: "Em processamento",
        shipped: "Enviada",
        delivered: "Entregue",
        cancelled: "Cancelada",
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Page>
            <Header>
                <Greeting>
                    <GreetingSmall>
                        Olá
                    </GreetingSmall>

                    <GreetingTitle>
                        {getGreeting()},{" "}
                        {vendor?.contactName?.split(" ")[0] ||
                            "Vendedor"}
                    </GreetingTitle>
                </Greeting>

                <HeaderActions>
                    <Button
                        type="button"
                        text="Atualizar"
                        size="sm"
                        icon={<LuRefreshCw size={17} />}
                        onClick={() => {
                            getProducts();
                            getOrders();
                        }}
                    />
                </HeaderActions>
            </Header>

            <StatsGrid>
                <StatCard>
                    <StatIcon $type="products">
                        <LuPackage size={20} />
                    </StatIcon>

                    <StatContent>
                        <StatLabel>
                            Total de produtos
                        </StatLabel>

                        <StatValue>
                            {stats.totalProducts}
                        </StatValue>

                        <StatDescription>
                            Produtos cadastrados
                        </StatDescription>
                    </StatContent>
                </StatCard>

                <StatCard>
                    <StatIcon $type="active">
                        <LuBoxes size={20} />
                    </StatIcon>

                    <StatContent>
                        <StatLabel>
                            Produtos ativos
                        </StatLabel>

                        <StatValue>
                            {stats.activeProducts}
                        </StatValue>

                        <StatDescription>
                            Disponíveis para venda
                        </StatDescription>
                    </StatContent>
                </StatCard>

                <StatCard>
                    <StatIcon $type="warning">
                        <LuTriangleAlert size={20} />
                    </StatIcon>

                    <StatContent>
                        <StatLabel>
                            Stock baixo
                        </StatLabel>

                        <StatValue>
                            {stats.lowStock}
                        </StatValue>

                        <StatDescription>
                            Precisam de reposição
                        </StatDescription>
                    </StatContent>
                </StatCard>

                <StatCard>
                    <StatIcon $type="danger">
                        <LuCircleX size={20} />
                    </StatIcon>

                    <StatContent>
                        <StatLabel>
                            Sem stock
                        </StatLabel>

                        <StatValue>
                            {stats.outOfStock}
                        </StatValue>

                        <StatDescription>
                            Produtos esgotados
                        </StatDescription>
                    </StatContent>
                </StatCard>

                <StatCard>
                    <StatIcon $type="value">
                        <LuShoppingBag size={20} />
                    </StatIcon>

                    <StatContent>
                        <StatLabel>
                            Valor em stock
                        </StatLabel>

                        <StatValue>
                            {formatCurrency(
                                stats.stockValue
                            )}
                        </StatValue>

                        <StatDescription>
                            Valor estimado do inventário
                        </StatDescription>
                    </StatContent>
                </StatCard>
            </StatsGrid>

            <Section>
                <SectionHeader>
                    <div>
                        <SectionTitle>
                            Distribuição das encomendas
                        </SectionTitle>

                        <SectionDescription>
                            Estado atual das suas encomendas.
                        </SectionDescription>
                    </div>
                </SectionHeader>

                <OrdersGrid>
                    <OrderStatusCard $type="pending">
                        <StatusHeader>
                            <StatusName>
                                <LuClock3 size={18} />
                                Pendentes
                            </StatusName>

                            <StatusValue>
                                {stats.pending}
                            </StatusValue>
                        </StatusHeader>
                    </OrderStatusCard>

                    <OrderStatusCard $type="confirmed">
                        <StatusHeader>
                            <StatusName>
                                <LuCheck size={18} />
                                Confirmadas
                            </StatusName>

                            <StatusValue>
                                {stats.confirmed}
                            </StatusValue>
                        </StatusHeader>
                    </OrderStatusCard>

                    <OrderStatusCard $type="processing">
                        <StatusHeader>
                            <StatusName>
                                <LuPackage size={18} />
                                Em processamento
                            </StatusName>

                            <StatusValue>
                                {stats.processing}
                            </StatusValue>
                        </StatusHeader>
                    </OrderStatusCard>

                    <OrderStatusCard $type="shipped">
                        <StatusHeader>
                            <StatusName>
                                <LuTruck size={18} />
                                Enviadas
                            </StatusName>

                            <StatusValue>
                                {stats.shipped}
                            </StatusValue>
                        </StatusHeader>
                    </OrderStatusCard>

                    <OrderStatusCard $type="delivered">
                        <StatusHeader>
                            <StatusName>
                                <LuCircleCheck size={18} />
                                Entregues
                            </StatusName>

                            <StatusValue>
                                {stats.delivered}
                            </StatusValue>
                        </StatusHeader>
                    </OrderStatusCard>

                    <OrderStatusCard $type="cancelled">
                        <StatusHeader>
                            <StatusName>
                                <LuCircleX size={18} />
                                Canceladas
                            </StatusName>

                            <StatusValue>
                                {stats.cancelled}
                            </StatusValue>
                        </StatusHeader>
                    </OrderStatusCard>
                </OrdersGrid>
            </Section>

            <BottomGrid>
                <SummaryCard>
                    <SummaryLabel>
                        Total de encomendas
                    </SummaryLabel>

                    <SummaryValue>
                        {stats.totalOrders}
                    </SummaryValue>

                    <StatDescription>
                        Todas as encomendas registadas
                    </StatDescription>
                </SummaryCard>

                <SummaryCard>
                    <SummaryLabel>
                        Vendas
                    </SummaryLabel>

                    <SummaryValue>
                        {formatCurrency(stats.sales)}
                    </SummaryValue>

                    <StatDescription>
                        Excluindo encomendas canceladas
                    </StatDescription>
                </SummaryCard>

                <SummaryCard>
                    <SummaryLabel>
                        Ticket médio
                    </SummaryLabel>

                    <SummaryValue>
                        {formatCurrency(
                            stats.averageOrder
                        )}
                    </SummaryValue>

                    <StatDescription>
                        Valor médio por encomenda
                    </StatDescription>
                </SummaryCard>
            </BottomGrid>

            <Section>
                <SectionHeader>
                    <div>
                        <SectionTitle>
                            Últimas encomendas
                        </SectionTitle>

                        <SectionDescription>
                            As encomendas mais recentes.
                        </SectionDescription>
                    </div>

                    <Button
                        type="button"
                        text="Ver todas"
                        size="sm"
                        width
                        icon={<LuArrowRight size={17} />}
                        onClick={() =>
                            navigate("/encomendas")
                        }
                    />
                </SectionHeader>

                {latestOrders.length === 0 ? (
                    <EmptyState>
                        Ainda não existem encomendas.
                    </EmptyState>
                ) : (
                    <OrdersTable>
                        <TableHeader>
                            <span>Nome</span>
                            <span>Total</span>
                            <span>Estado</span>
                            <span>Data</span>
                        </TableHeader>

                        {latestOrders.map((order) => (
                            <TableRow
                                key={order._id}
                                onClick={() =>
                                    navigate(
                                        `/encomendas/${order._id}`
                                    )
                                }
                            >
                                <strong>
                                    {order.orderName || "Sem nome"}
                                </strong>

                                <span>
                                    {formatCurrency(order.total
                                    )}
                                </span>

                                <span>
                                    {statusLabels[order.status
                                    ] || order.status}
                                </span>

                                <span>
                                    {formatDate(order.createdAt
                                    )}
                                </span>
                            </TableRow>
                        ))}
                    </OrdersTable>
                )}
            </Section>
        </Page>
    );
}