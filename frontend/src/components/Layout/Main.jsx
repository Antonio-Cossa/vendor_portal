import React from 'react'
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';


export default function Main({ children }) {
    return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.main`
    flex: 1;
    min-width: 0;
    min-height: 0;
    padding: 4rem 2rem;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
`;