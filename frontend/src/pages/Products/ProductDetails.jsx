import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    LuPencil,
    LuSave,
    LuPackage,
    LuArrowDownToLine,
    LuArrowUpFromLine,
    LuArrowLeft
} from "react-icons/lu";

import { InputField } from "../../Components/InputField/InputField";
import { Button } from "../../Components/Button/Button";
import { useData } from "../../context/DataContext";
import ProductView from "../../components/Products/ProductView";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { RxCross2 } from "react-icons/rx";
import Loading from "../../components/Loadding/Loading";

import {
    Page,
    Header,
    HeaderInfo,
    Title,
    Subtitle,
    Section,
    SectionTitle,
    Grid,
    Field,
    Label,
    Select,
    Info,
    InfoLabel,
    InfoValue,
    Status,
    StockCurrent,
    StockLabel,
    StockValue,
    StockGrid,
    StockHint,
    Actions,
    EditForm,
    Empty,
    BackButton
} from './productDetails.style.js';

export default function ProductDetails() {
    const { id } = useParams();

    const {
        getProduct,
        updateProduct,
        updateStock,
    } = useData();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("active");

    const [stockOperation, setStockOperation] = useState("increase");
    const [stockQuantity, setStockQuantity] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);

            const response = await getProduct(id);

            const data = response.product;

            setProduct(data);

            setName(data.name);
            setSku(data.sku);
            setCategory(data.category);
            setPrice(data.price);
            setStatus(data.status);
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        if (!product) return;

        setName(product.name);
        setSku(product.sku);
        setCategory(product.category);
        setPrice(product.price);
        setStatus(product.status);

        setStockOperation("increase");
        setStockQuantity("");

        setEditing(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const result = await updateProduct(id, {
                name,
                sku,
                category,
                price: Number(price),
                status,
            });


            if (
                stockQuantity !== "" &&
                Number(stockQuantity) > 0
            ) {
                const result = await updateStock(id, {
                    operation: stockOperation,
                    quantity: Number(stockQuantity),
                });

                toast.success(result.message)
            }

            const response = await getProduct(id);
            toast.success(result.message)

            setProduct(response.product);
            setStockOperation("increase");
            setStockQuantity("");
            setEditing(false);

        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!product) {
        return (
            <Empty>
                Produto não encontrado.
            </Empty>
        );
    }

    return (
        <Page>
            <BackButton
                type="button"
                onClick={() => navigate("/produtos")}
            >
                <LuArrowLeft size={20} />
                Produtos
            </BackButton>
            <Header>

                <HeaderInfo>
                    <Title>
                        {product.name}
                    </Title>
                    <Subtitle>
                        <span>SKU:{product.sku}</span>
                        <span>ID:{product._id}</span>

                    </Subtitle>
                </HeaderInfo>

                {!editing && (
                    <Button
                        icon={<LuPencil size={18} />}
                        text="Editar"
                        size="sm"
                        onClick={handleEdit}
                    />
                )}
            </Header>

            {editing ? (
                <EditForm onSubmit={handleSave}>

                    <Section>
                        <SectionTitle>
                            Informações do produto
                        </SectionTitle>

                        <Grid>

                            <Field>
                                <Label>Nome</Label>

                                <InputField
                                    type="text"
                                    placeholder="Nome do produto"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />
                            </Field>

                            <Field>
                                <Label>SKU</Label>

                                <InputField
                                    type="text"
                                    placeholder="SKU"
                                    value={sku}
                                    onChange={(e) =>
                                        setSku(e.target.value)
                                    }
                                    required
                                />
                            </Field>

                            <Field>
                                <Label>Categoria</Label>

                                <InputField
                                    type="text"
                                    placeholder="Categoria"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    required
                                />
                            </Field>

                            <Field>
                                <Label>Preço</Label>

                                <InputField
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Preço"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(e.target.value)
                                    }
                                    required
                                />
                            </Field>

                            <Field>
                                <Label>Estado</Label>

                                <Select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                >
                                    <option value="active">
                                        Ativo
                                    </option>

                                    <option value="inactive">
                                        Inativo
                                    </option>
                                </Select>
                            </Field>

                        </Grid>
                    </Section>

                    <Section>
                        <SectionTitle>
                            Atualizar estoque
                        </SectionTitle>

                        <StockCurrent>
                            <LuPackage size={20} />

                            <div>
                                <StockLabel>
                                    Estoque atual
                                </StockLabel>

                                <StockValue>
                                    {product.stock}
                                </StockValue>
                            </div>
                        </StockCurrent>

                        <StockGrid>

                            <Field>
                                <Label>
                                    Operação
                                </Label>

                                <Select
                                    value={stockOperation}
                                    onChange={(e) =>
                                        setStockOperation(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="increase">
                                        Entrada
                                    </option>

                                    <option value="decrease">
                                        Saída
                                    </option>
                                </Select>
                            </Field>

                            <Field>
                                <Label>
                                    Quantidade
                                </Label>

                                <InputField
                                    type="number"
                                    min="0"
                                    placeholder="Quantidade"
                                    value={stockQuantity}
                                    onChange={(e) =>
                                        setStockQuantity(
                                            e.target.value
                                        )
                                    }
                                />
                            </Field>

                        </StockGrid>

                        <StockHint>
                            {stockOperation === "increase" ? (
                                <>
                                    <LuArrowDownToLine size={16} />

                                    A quantidade será adicionada
                                    ao estoque.
                                </>
                            ) : (
                                <>
                                    <LuArrowUpFromLine size={16} />

                                    A quantidade será retirada
                                    do estoque.
                                </>
                            )}
                        </StockHint>
                    </Section>

                    <Actions>

                        <Button
                            type="button"
                            text="Cancelar"
                            size="sm"
                            icon={<RxCross2 size={19} />}
                            onClick={handleCancel}
                            disabled={saving}
                        />

                        <Button
                            type="submit"
                            disabled={saving}
                            icon={<LuSave size={18} />}
                            text={
                                saving
                                    ? "Salvando..."
                                    : "Salvar"
                            }
                            size="sm"
                        />

                    </Actions>

                </EditForm>
            ) : (
                <ProductView product={product} />
            )}

        </Page>
    );
}

