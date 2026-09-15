import styled from "styled-components";

function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleString(
        "pt-MZ",
        {
            dateStyle: "short",
            timeStyle: "short",
        }
    );
}

export default function ProductView({ product }) {
    return (
        <Section>

            <SectionTitle>
                Informações do produto
            </SectionTitle>

            <Grid>

                <Info>
                    <InfoLabel>
                        Nome
                    </InfoLabel>

                    <InfoValue>
                        {product.name}
                    </InfoValue>
                </Info>

                <Info>
                    <InfoLabel>
                        SKU
                    </InfoLabel>

                    <InfoValue>
                        {product.sku}
                    </InfoValue>
                </Info>

                <Info>
                    <InfoLabel>
                        Categoria
                    </InfoLabel>

                    <InfoValue>
                        {product.category}
                    </InfoValue>
                </Info>

                <Info>
                    <InfoLabel>
                        Preço
                    </InfoLabel>

                    <InfoValue>
                        {Number(product.price).toFixed(2)}
                    </InfoValue>
                </Info>

                <Info>
                    <InfoLabel>
                        Estoque
                    </InfoLabel>

                    <InfoValue>
                        {product.stock}
                    </InfoValue>
                </Info>

                <Info>
                    <InfoLabel>
                        Estado
                    </InfoLabel>

                    <Status $active={product.status === "active"}>
                        {product.status === "active"
                            ? "Ativo"
                            : "Inativo"}
                    </Status>
                </Info>

                <Info>
                    <InfoLabel>
                        Criado em
                    </InfoLabel>

                    <InfoValue>
                        {formatDate(product.createdAt)}
                    </InfoValue>
                </Info>

                <Info>
                    <InfoLabel>
                        Atualizado em
                    </InfoLabel>

                    <InfoValue>
                        {formatDate(product.updatedAt)}
                    </InfoValue>
                </Info>

            </Grid>

        </Section>
    );
}

const Page = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    padding: 24px;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf0;
    border-radius: 16px;


    
`;

const HeaderInfo = styled.div`
    min-width: 0;

    
`;

const Title = styled.h1`
    margin: 0;

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.fontSizes.xl};

    font-weight: ${({ theme }) =>
        theme.fontWeight.bold};

    word-break: break-word;
`;

const Subtitle = styled.p`
    margin: 6px 0 0;

    color: ${({ theme }) =>
        theme.colors.gray};

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};
`;

const Section = styled.section`
    width: 100%;
    box-sizing: border-box;

    padding: 24px;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #eadcf0;
    border-radius: 16px;
`;

const SectionTitle = styled.h2`
    margin: 0 0 20px;

    font-size: ${({ theme }) =>
        theme.fontSizes.lg};

    color: ${({ theme }) =>
        theme.colors.text};
        
`;

const Grid = styled.div`
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

const Field = styled.div`
    width: 100%;
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Label = styled.label`
    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    font-weight: ${({ theme }) =>
        theme.fontWeight.medium};

    color: ${({ theme }) =>
        theme.colors.text};
`;

const Select = styled.select`
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

const Info = styled.div`
    min-width: 0;

    padding: 16px;

    border: 1px solid #edf0f3;
    border-radius: 10px;

    background: #fafbfc;
    display: flex;
    flex-direction: column;
`;

const InfoLabel = styled.div`
    margin-bottom: 7px;

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    color: ${({ theme }) =>
        theme.colors.gray};
`;

const InfoValue = styled.div`
    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.fontSizes.md};

    font-weight: ${({ theme }) =>
        theme.fontWeight.medium};

    overflow-wrap: anywhere;
`;

const Status = styled.span`
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








