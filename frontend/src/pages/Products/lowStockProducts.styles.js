import styled from "styled-components";

export const Page = styled.div`
    width: 100%;
    padding-bottom: 40px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 8px;

    @media (max-width: 600px) {
        align-items: flex-start;
    }
`;

export const Title = styled.h1`
    margin: 0;

    font-size: ${({ theme }) =>
        theme.fontSizes.xl};

    color: ${({ theme }) =>
        theme.colors.text};
`;

export const Description = styled.p`
    margin: 6px 0 0;

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    color: ${({ theme }) =>
        theme.colors.gray};
`;

export const TopBar = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 24px 0 16px;

    > div {
        width: 320px;
    }

    @media (max-width: 600px) {
        > div {
            width: 100%;
        }
    }
`;

export const ProductsContainer = styled.div`
    width: 100%;
    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf5;
    border-radius: 28px;
    overflow: hidden;
`;

export const TableWrapper = styled.div`
    width: 100%;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const TableHeader = styled.div`
    display: grid;

    grid-template-columns:
        minmax(180px, 2fr)
        1.2fr
        1.2fr
        1fr
        0.8fr
        1fr
        0.8fr;

    padding: 16px 20px;

    background: #f8fafc;
    border-bottom: 1px solid #edf0f5;
`;

export const TableHead = styled.span`
    font-size: 11px;
    font-weight: 600;

    color: #64748b;
    text-transform: uppercase;
`;

export const ProductRow = styled.div`
    display: grid;

    grid-template-columns:
        minmax(180px, 2fr)
        1.2fr
        1.2fr
        1fr
        0.8fr
        1fr
        0.8fr;

    align-items: center;

    padding: 18px 20px;

    border-bottom: 1px solid #edf0f5;

    &:last-child {
        border-bottom: none;
    }
`;

export const ProductInfo = styled.div`
    min-width: 0;
`;

export const ProductName = styled.strong`
    display: block;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: 14px;
`;

export const ProductSku = styled.span`
    color: #64748b;
    font-size: 13px;
`;

export const Category = styled.span`
    color: #475569;
    font-size: 13px;
`;

export const Price = styled.span`
    color: #111827;
    font-size: 14px;
`;

export const Stock = styled.span`
    font-size: 14px;
    color: #111827;
`;

export const StockWarning = styled.span`
    font-size: 14px;
    font-weight: 600;

    color: #d97706;
`;

export const Status = styled.span`
    width: fit-content;

    padding: 5px 10px;

    border-radius: 999px;

    background: #fff7ed;
    color: #d97706;

    font-size: 11px;
    font-weight: 600;
`;

export const Action = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const MobileList = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
    }
`;

export const ProductCard = styled.div`
    padding: 18px;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf5;
    border-radius: 18px;

    cursor: pointer;
`;

export const CardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;

    padding-bottom: 15px;

    border-bottom: 1px solid #edf0f5;
`;

export const CardName = styled.strong`
    display: block;

    color: #111827;
    font-size: 15px;
`;

export const CardSku = styled.span`
    display: block;
    margin-top: 4px;

    color: #64748b;
    font-size: 12px;
`;

export const CardBody = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    gap: 16px;

    padding-top: 16px;
`;

export const CardItem = styled.div`
    min-width: 0;
`;

export const CardLabel = styled.span`
    display: block;

    margin-bottom: 4px;

    color: #64748b;
    font-size: 11px;
`;

export const CardValue = styled.span`
    color: #111827;
    font-size: 13px;
`;

export const EmptyState = styled.div`
    min-height: 240px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 8px;

    padding: 30px;

    color: #64748b;
    text-align: center;

    svg {
        margin-bottom: 6px;
    }

    strong {
        color: #334155;
        font-size: 15px;
    }

    span {
        font-size: 13px;
    }
`;