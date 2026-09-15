import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../../components/Loadding/Loading';
import styled from 'styled-components';
import img from '../../assets/form_art.svg'
import { InputField } from '../../Components/InputField/InputField';
import { Button } from '../../Components/Button/Button';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { getErrorMessage } from '../../utils/getErrorMessage';


export default function Signup() {
    const clearFields = () => {
        setPhone('');
        setPassword('');
        setContactName('');
        setCompanyName('');
        setCompanyAddress('');
        setEmail('');
    };

    const [companyName, setCompanyName] = useState(null)
    const [companyAddress, setCompanyAddress] = useState(null)
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [contactName, setContactName] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const { register } = useAuth()

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            if (password.length < 12) {
                toast.error("A senha precisa ter pelo menos 12 dígitos");
                return;
            }

            setLoading(true);

            const payload = {
                companyName,
                companyAddress,
                contactName,
                email,
                password,
                phone
            };

            const result = await register(payload);

            toast.success(result.message);

            navigate("/dashboard", {
                replace: true
            });

        } catch (e) {
            toast.error(getErrorMessage(e));
        } finally {
            setLoading(false);
        }
    };

    return (

        <>
            {
                loading ? <Loading /> :

                    <Wrapper>
                        <Container>
                            <LeftCont>
                                <LeftImgCont>
                                    <img src={img} />
                                </LeftImgCont>
                            </LeftCont>

                            <RightCont>
                                <form onSubmit={handleSignup} >
                                    <Greetings>
                                        <span>Ola, Bem vindo/a!</span>
                                    </Greetings>
                                    <Inputs>
                                        <InputField type="text" placeholder="Nome da empresa" onChange={(e) => setCompanyName(e.target.value)} value={companyName} required />
                                        <InputField type="text" placeholder="Nome de contato" autoComplete="name" onChange={(e) => setContactName(e.target.value)} value={contactName} required={true} />
                                        <InputField type="text" placeholder="Número" autoComplete="tel" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                                        <InputField type="email" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                        <InputField type="text" placeholder="Endereco da empresa" autoComplete="street-address" onChange={(e) => setCompanyAddress(e.target.value)} value={companyAddress} required />
                                        <InputField type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Senha minimo 12 digitos" autoComplete="new-password" required />
                                    </Inputs>
                                    <RightButtonCont>
                                        <Button text="Continuar" type="submit" disabled={loading} size="lg" />
                                        <span>Ja tem conta?
                                            <Link to="/entrar">
                                                Clique aqui
                                            </Link>
                                        </span>
                                    </RightButtonCont>
                                </form>
                            </RightCont>
                        </Container>
                    </Wrapper>
            }
        </>
    )

}
const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
`
const Container = styled.div`
    width: 1000px;
    min-height: 550px;
    background-color: ${({ theme }) => theme.colors.white};
    overflow: hidden;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    @media screen and (max-width: 1050px) {
        max-width: 400px;
        justify-content: center;
    }

    @media screen and (max-width: 400px) {
        max-width: 350px;
    }
    `;

const LeftCont = styled.div`
    position: relative;
    width: 50%;
    height: 530px;
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

    @media screen and (max-width: 1050px) {
        display: none;
    }
    `;

const LeftImgCont = styled.div`
        width: 100%;
        height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    `;

const RightCont = styled.div`

    width: 50%;
    height: 100%;
    gap: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    `;

const Greetings = styled.div`
    width: 300px;

    @media screen and (max-width: 400px) {
        width: 280px;
    }

    span {
        font-weight: 600;
        font-size: 2rem;

        @media screen and (max-width: 400px) {
        font-size: 1.5rem;
        }
    }
    `;

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    span {
        font-size: .7rem;
        font-weight: 500;
        align-self: flex-end;
    }

    a {
        text-decoration: none;
        font-weight: bold;
        color:  ${({ theme }) => theme.colors.primary};

        &:hover {
        color: ${({ theme }) => theme.colors.secondary};
        transition: .3s;
        }
    }

    input {
        width: 300px;
        height: 50px;
        border-radius: 10px;
        padding-left: 10px;
        outline: none;
        background: none;
        border: 1px solid  ${({ theme }) => theme.colors.text};

        &:focus {
        border: 1px solid  ${({ theme }) => theme.colors.secondary};
        transition: .3s;
        }

        &.input-error {
        border: 1px solid red !important;
        }

        @media screen and (max-width: 400px) {
        width: 280px;
        }
    }
    `;

const RightButtonCont = styled.div`
    width: 300px;
    display: flex;
    border-radius: 20px;
    flex-direction: column;
    gap: 30px;
    padding-top: 30px;

    @media screen and (max-width: 400px) {
        width: 280px;
    }


    span {
        font-size: .7rem;
        font-weight: 600;
        align-self: center;

        a {
        text-decoration: none;
        font-weight: bold;
        color:  ${({ theme }) => theme.colors.primary};

        &:hover {
            color:  ${({ theme }) => theme.colors.secondary};
        }
        }
    }
    `;



