import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { LuPencil, LuSave } from "react-icons/lu";
import styled from "styled-components";
import { toast } from "react-toastify";

import { Button } from "../../Components/Button/Button";
import { InputField } from "../../Components/InputField/InputField";
import Loading from "../../components/Loadding/Loading";
import { getErrorMessage } from "../../utils/getErrorMessage";

export default function Profile() {
    const { vendor, checkAuth } = useAuth();
    const { updateVendor } = useData();

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [contactName, setContactName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    useEffect(() => {
        if (!vendor) return;

        setCompanyName(vendor.companyName || "");
        setCompanyAddress(vendor.companyAddress || "");
        setContactName(vendor.contactName || "");
        setPhone(vendor.phone || "");
        setEmail(vendor.email || "");

        setBankName(vendor.bankDetails?.bankName || "");
        setAccountHolder(vendor.bankDetails?.accountHolder || "");
        setAccountNumber(vendor.bankDetails?.accountNumber || "");
    }, [vendor]);

    if (!vendor) {
        return <Loading />;
    }


    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setCompanyName(vendor.companyName || "");
        setCompanyAddress(vendor.companyAddress || "");
        setContactName(vendor.contactName || "");
        setPhone(vendor.phone || "");
        setEmail(vendor.email || "");

        setBankName(vendor.bankDetails?.bankName || "");
        setAccountHolder(vendor.bankDetails?.accountHolder || "");
        setAccountNumber(vendor.bankDetails?.accountNumber || "");

        setEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const data = {
                companyName,
                companyAddress,
                contactName,
                phone,
                email,
                bankDetails: {
                    bankName,
                    accountHolder,
                    accountNumber,
                },
            };

            const result = await updateVendor(data);

            if (result?.vendor) {
                await checkAuth();
            }

            setEditing(false);

            toast.success(
                result?.message ||
                "Perfil atualizado com sucesso"
            );
        } catch (e) {
            console.log(e)
            toast.error(getErrorMessage(e));
        } finally {
            setSaving(false);
        }
    };


    return (
        <Page>
            <Header>
                <div>
                    <Title>Meu perfil</Title>
                </div>

                {!editing && (
                    <Button
                        type="button"
                        text="Editar"
                        size="sm"
                        width
                        icon={<LuPencil size={18} />}
                        onClick={handleEdit}
                    />
                )}
            </Header>

            <Content>
                <Card>
                    <CardHeader>
                        <div>
                            <Title>Dados da empresa</Title>
                        </div>
                    </CardHeader>

                    {editing ? (
                        <Form onSubmit={handleSubmit}>
                            <FieldsGrid>
                                <Field>
                                    <InputField
                                        label="Nome da empresa"
                                        name="companyName"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                    />
                                </Field>

                                <Field>
                                    <InputField
                                        label="Nome do contacto"
                                        name="contactName"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        required
                                    />
                                </Field>

                                <Field>
                                    <InputField
                                        label="Telefone"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </Field>

                                <Field>
                                    <InputField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Field>

                                <Field $full>
                                    <InputField
                                        label="Endereço da empresa"
                                        name="companyAddress"
                                        value={companyAddress}
                                        onChange={(e) => setCompanyAddress(e.target.value)}
                                        required
                                    />
                                </Field>
                            </FieldsGrid>

                            <Actions>
                                <Button
                                    type="button"
                                    text="Cancelar"
                                    size="sm"
                                    disabled={saving}
                                    onClick={handleCancel}
                                />

                                <Button
                                    type="submit"
                                    text="Salvar"
                                    size="sm"
                                    icon={<LuSave size={18} />}
                                    disabled={saving}
                                />
                            </Actions>
                        </Form>
                    ) : (
                        <FieldsGrid>
                            <Field>
                                <Label>Nome da empresa</Label>
                                <Value>
                                    {vendor.companyName || "-"}
                                </Value>
                            </Field>

                            <Field>
                                <Label>Nome do contacto</Label>
                                <Value>
                                    {vendor.contactName || "-"}
                                </Value>
                            </Field>

                            <Field>
                                <Label>Telefone</Label>
                                <Value>
                                    {vendor.phone || "-"}
                                </Value>
                            </Field>

                            <Field>
                                <Label>Email</Label>
                                <Value>
                                    {vendor.email || "-"}
                                </Value>
                            </Field>

                            <Field $full>
                                <Label>Endereço da empresa</Label>
                                <Value>
                                    {vendor.companyAddress || "-"}
                                </Value>
                            </Field>
                        </FieldsGrid>
                    )}
                </Card>

                <Card>
                    <CardHeader>
                        <div>
                            <Title>Dados bancários</Title>
                        </div>
                    </CardHeader>

                    {editing ? (
                        <FieldsGrid>
                            <Field>
                                <InputField
                                    label="Banco"
                                    name="bankName"
                                    value={bankName}
                                    onChange={(e) =>
                                        setBankName(e.target.value)
                                    }
                                />
                            </Field>

                            <Field>
                                <InputField
                                    label="Titular da conta"
                                    name="accountHolder"
                                    value={accountHolder}
                                    onChange={(e) =>
                                        setAccountHolder(e.target.value)
                                    }
                                />
                            </Field>

                            <Field $full>
                                <InputField
                                    label="Número da conta"
                                    name="accountNumber"
                                    value={accountNumber}
                                    onChange={(e) =>
                                        setAccountNumber(e.target.value)
                                    }
                                />
                            </Field>
                        </FieldsGrid>
                    ) : (
                        <FieldsGrid>
                            <Field>
                                <Label>Banco</Label>
                                <Value>
                                    {vendor.bankDetails?.bankName || "-"}
                                </Value>
                            </Field>

                            <Field>
                                <Label>Titular da conta</Label>
                                <Value>
                                    {vendor.bankDetails?.accountHolder || "-"}
                                </Value>
                            </Field>

                            <Field $full>
                                <Label>Número da conta</Label>
                                <Value>
                                    {vendor.bankDetails?.accountNumber || "-"}
                                </Value>
                            </Field>
                        </FieldsGrid>
                    )}
                </Card>

                <Card>
                    <CardHeader>
                        <div>
                            <Title>Informações da conta</Title>
                        </div>
                    </CardHeader>

                    <FieldsGrid>
                        <Field>
                            <Label>Status</Label>
                            <Value>
                                {vendor.status === "active"
                                    ? "Ativo"
                                    : "Inativo"}
                            </Value>
                        </Field>

                        <Field>
                            <Label>Conta criada em</Label>
                            <Value>
                                {new Date(
                                    vendor.createdAt
                                ).toLocaleDateString("pt-PT")}
                            </Value>
                        </Field>
                    </FieldsGrid>
                </Card>
            </Content>
        </Page>
    );
}


export const Page = styled.div`
    width: 100%;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

export const Title = styled.h1`
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Card = styled.section`
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid #eadcf5;
    border-radius: 28px;
    padding: 28px;

    @media (max-width: 600px) {
        padding: 20px;
        border-radius: 20px;
    }
`;

export const CardHeader = styled.div`
    margin-bottom: 28px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const FieldsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
        gap: 18px;
    }
`;

export const Field = styled.div`
    min-width: 0;

    ${({ $full }) =>
        $full &&
        `
            grid-column: 1 / -1;
        `}
`;

export const Label = styled.span`
    display: block;
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray};
`;

export const Value = styled.div`
    min-height: 42px;
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    @media (max-width: 600px) {
        flex-direction: column;

        button {
            width: 100%;
        }
    }
`;