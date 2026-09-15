import styled from "styled-components";

export const Page = styled.div`
    width: 100%;
    padding-bottom: 40px;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 28px;

    @media (max-width: 600px) {
        align-items: flex-start;
    }
`;

export const Greeting = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const GreetingSmall = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.primary};
`;

export const GreetingTitle = styled.h1`
    margin: 0;
    font-size: 30px;
    line-height: 1.2;
    color: #111827;
    font-weight: ${({ theme }) =>
        theme.fontWeight.bold};

    @media (max-width: 600px) {
        font-size: 25px;
    }
`;

export const HeaderActions = styled.div`
    display: flex;
    gap: 10px;
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
    margin-bottom: 28px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export const StatCard = styled.div`
    min-width: 0;
    padding: 22px;
    background: #f8fafc;
    border: 1px solid #edf0f5;
    border-radius: 22px;

    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const StatIcon = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.primary};
    background: #f3e8f1;
`;

export const StatContent = styled.div`
    min-width: 0;
`;

export const StatLabel = styled.div`
    font-size: 13px;
    color: #53627a;
    margin-bottom: 5px;
`;

export const StatValue = styled.div`
    font-size: 27px;
    line-height: 1.2;
    color: #111827;
    font-weight: 500;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StatDescription = styled.div`
    margin-top: 4px;
    font-size: 12px;
    color: #53627a;
`;

export const Section = styled.section`
    padding: 28px;
    margin-bottom: 24px;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #edf0f5;
    border-radius: 24px;

    @media (max-width: 600px) {
        padding: 20px;
        border-radius: 20px;
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 24px;

    @media (max-width: 600px) {
        align-items: flex-start;
    }
`;

export const SectionTitle = styled.h2`
    margin: 0;
    font-size: 19px;
    color: #111827;
`;

export const SectionDescription = styled.p`
    margin: 6px 0 0;
    font-size: 13px;
    color: #64748b;
`;

export const OrdersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 550px) {
        grid-template-columns: 1fr;
    }
`;

export const OrderStatusCard = styled.div`
    padding: 22px;

    background: #f8fafc;
    border: 1px solid #edf0f5;
    border-radius: 18px;
`;

export const StatusHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
`;

export const StatusName = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 14px;
    color: #334155;
`;

export const StatusValue = styled.strong`
    font-size: 27px;
    color: #111827;
    font-weight: 500;
`;

export const BottomGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const SummaryCard = styled.div`
    padding: 24px;

    background: #f8fafc;
    border: 1px solid #edf0f5;
    border-radius: 20px;
`;

export const SummaryLabel = styled.div`
    font-size: 13px;
    color: #53627a;
`;

export const SummaryValue = styled.div`
    margin-top: 7px;

    font-size: 27px;
    color: #111827;
    font-weight: 500;
`;

export const OrdersTable = styled.div`
    width: 100%;
    overflow: hidden;

    border: 1px solid #edf0f5;
    border-radius: 16px;
`;

export const TableHeader = styled.div`
    display: grid;
    grid-template-columns:
        minmax(180px, 2fr)
        1fr
        1fr
        1fr;

    padding: 14px 18px;

    background: #f8fafc;

    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;

    @media (max-width: 600px) {
        display: none;
    }
`;

export const TableRow = styled.div`
    display: grid;
    grid-template-columns:
        minmax(180px, 2fr)
        1fr
        1fr
        1fr;

    padding: 17px 18px;

    align-items: center;

    border-top: 1px solid #edf0f5;

    font-size: 13px;
    color: #475569;

    cursor: pointer;
    transition: background 0.15s;

    &:hover {
        background: #faf7fb;
    }

    strong {
        color: #111827;
        font-weight: 500;
    }

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 7px;
    }
`;

export const EmptyState = styled.div`
    padding: 40px 20px;
    text-align: center;

    color: #64748b;
    font-size: 14px;

    background: #f8fafc;
    border-radius: 16px;
`;