import styled from "styled-components";

export const Page = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;

    padding: 24px;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf0;
    border-radius: 16px;
`;

export const HeaderInfo = styled.div`
    min-width: 0;
`;

export const Title = styled.h1`
    margin: 0;

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.fontSizes.xl};

    font-weight: ${({ theme }) =>
        theme.fontWeight.bold};

    word-break: break-word;
`;

export const Subtitle = styled.div`
    margin: 6px 0 0;
display: flex;
gap: 10px;
    color: ${({ theme }) =>
        theme.colors.gray};

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};


    @media (max-width: 600px) {
        flex-direction: column;
    }

`;

export const Section = styled.section`
    width: 100%;
    box-sizing: border-box;

    padding: 24px;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf0;
    border-radius: 16px;
`;

export const SectionTitle = styled.h2`
    margin: 0 0 20px;

    font-size: ${({ theme }) =>
        theme.fontSizes.lg};

    color: ${({ theme }) =>
        theme.colors.text};
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns:
        repeat(3, minmax(0, 1fr));

    gap: 16px;

    @media (max-width: 900px) {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const Field = styled.div`
    width: 100%;
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const Label = styled.label`
    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    font-weight: ${({ theme }) =>
        theme.fontWeight.medium};

    color: ${({ theme }) =>
        theme.colors.text};
`;

export const Select = styled.select`
    width: 100%;
    height: 42px;

    padding: 0 12px;

    border: 1px solid #ddd;
    border-radius: 8px;

    background: ${({ theme }) =>
        theme.colors.white};

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    outline: none;

    box-sizing: border-box;

    &:focus {
        border-color: ${({ theme }) =>
        theme.colors.primary};
    }
`;

export const Info = styled.div`
    min-width: 0;

    padding: 16px;

    border: 1px solid #edf0f3;
    border-radius: 10px;

    background: #fafbfc;
`;

export const InfoLabel = styled.div`
    margin-bottom: 7px;

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    color: ${({ theme }) =>
        theme.colors.gray};
`;

export const InfoValue = styled.div`
    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.fontSizes.md};

    font-weight: ${({ theme }) =>
        theme.fontWeight.medium};

    overflow-wrap: anywhere;
`;

export const Status = styled.span`
    display: inline-flex;
    align-items: center;

    width: fit-content;

    padding: 5px 12px;

    border-radius: 20px;

    background: ${({ $active }) =>
        $active ? "#eee0ff" : "#eeeeee"};

    color: ${({ theme }) =>
        theme.colors.primary};

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    font-weight: 600;
`;

export const StockCurrent = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    margin-bottom: 20px;

    padding: 16px;

    border-radius: 10px;

    background: #fafbfc;

    color: ${({ theme }) =>
        theme.colors.primary};
`;

export const StockLabel = styled.div`
    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    color: ${({ theme }) =>
        theme.colors.gray};
`;

export const StockValue = styled.div`
    margin-top: 2px;

    font-size: ${({ theme }) =>
        theme.fontSizes.lg};

    font-weight: ${({ theme }) =>
        theme.fontWeight.bold};

    color: ${({ theme }) =>
        theme.colors.text};
`;

export const StockGrid = styled.div`
    display: grid;
    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: 16px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const StockHint = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;

    margin-top: 14px;

    color: ${({ theme }) =>
        theme.colors.gray};

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};
`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    @media (max-width: 500px) {
        flex-direction: column-reverse;

        button {
            width: 100%;
        }
    }
`;

export const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;


export const Empty = styled.div`
    padding: 40px;

    text-align: center;

    color: ${({ theme }) =>
        theme.colors.gray};
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    font-size: ${({ theme }) =>
        theme.fontSizes.md};
    
    &:hover {
        color: ${({ theme }) =>
        theme.colors.primary};
    }
`;