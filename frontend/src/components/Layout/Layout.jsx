import React from 'react'
import Main from './Main'
import Sidebar from './SideBar'
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Layout({ menuItems = [] }) {

    return (
        <Wrapper>
            <Sidebar menuItems={menuItems} />
            <Main >
                <Outlet />
            </Main>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
`;
