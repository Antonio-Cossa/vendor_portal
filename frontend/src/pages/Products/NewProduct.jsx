import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {
    LuArrowLeft,
    LuSave
} from "react-icons/lu";

import { useData } from "../../context/DataContext";
import { Button } from "../../Components/Button/Button";
import { InputField } from "../../Components/InputField/InputField";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import Loading from "../../components/Loadding/Loading";

export default function ProductDetails() {
    const navigate = useNavigate();

    const {
        createProduct
    } = useData();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState(null)
    const [sku, setSku] = useState(null)
    const [price, setPrice] = useState(null)
    const [stock, setStock] = useState(null)
    const [category, setCategory] = useState(null)




    if (loading) {
        return <Loading />;
    }

    const handleCreate = async (e) => {
        e.preventDefault()

        try {

            setLoading(true)
            const payload = {
                name, sku, category, price, stock
            }

            const result = await createProduct(payload)

            toast.success(result.message)

            navigate(`/produtos/${result.product._id}`)
        } catch (e) {
            toast.error(getErrorMessage(e))
            setLoading(false)
        }

    }


    return (
        <Page>

            <Header>
                <BackButton
                    type="button"
                    onClick={() => navigate("/produtos")}
                >
                    <LuArrowLeft size={20} />
                    Produtos
                </BackButton>

            </Header>

            <Content>

                <Card>

                    <Form
                        onSubmit={
                            handleCreate
                        }
                    >
                        <Field>
                            <Label>Nome</Label>
                            <InputField type="text" placeholder="Nome do produto" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Field>

                        <Field>
                            <Label>SKU</Label>
                            <InputField type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required />
                        </Field>

                        <Field>
                            <Label>Categoria</Label>
                            <InputField type="text" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} required />
                        </Field>

                        <Field>
                            <Label>Stock</Label>
                            <InputField type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                        </Field>

                        <Field>
                            <Label>Preço</Label>
                            <InputField type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </Field>

                        <Button
                            type="submit"
                            disabled={saving}
                            icon={<LuSave size={18} />}
                            text="Salvar" type="submit" size="sm"
                        />
                    </Form>

                </Card>

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
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const BackButton = styled.button`
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

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const Card = styled.section`
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid #eee;
    border-radius: 18px;
    overflow: hidden;
`;


const Label = styled.span`
    display: block;
    margin-bottom: 5px;
    color: #64748b;
    font-size: 11px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    letter-spacing: 0.5px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    @media (max-width: 700px) {
    }
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;
