import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Button = (props) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (props.href) {
            navigate(props.href)
        } else if (props.onClick) {
            props.onClick()
        }
    }


    return (

        <>
            <But type={props.type} $textcolor={props.textColor} $size={props.size} $width={props.width} $background={props.background} disabled={props.disabled} onClick={() => handleClick()} ><i>{props.icon}</i><span>{props.text}</span></But >
        </>
    )
}


const But = styled.button`
    color: ${({ $textcolor, theme }) => $textcolor || theme.colors.white};
    ${({ $size, theme }) => theme.buttonSizes[$size] || theme.buttonSizes.xl};
    background: ${({ $background, theme }) => $background || theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius}; 
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: none;
    width: ${({ $width }) => $width || "100%"};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
        &:hover{
            background: ${({ theme }) => theme.colors.secondary};
            color: ${({ theme }) => theme.colors.white};
            transition: .3s;
        }
`