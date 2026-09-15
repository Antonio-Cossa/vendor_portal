import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({
    menuItems = {}
}) {
    const location = useLocation();

    const [openMenus, setOpenMenus] = useState({});
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { logout } = useAuth()

    useEffect(() => {
        const openedMenus = {};
        menuItems.top.forEach((item) => {
            if (!item.children?.length) return;

            const hasActiveChild = item.children.some(
                (child) => location.pathname === child.path
            );

            openedMenus[item.id] = hasActiveChild;
        });

        setOpenMenus(openedMenus);
    }, [location.pathname, menuItems]);

    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    const toggleMenu = (id) => {
        setOpenMenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <>
            <MobileOverlay
                $open={isMobileOpen}
                onClick={() => setIsMobileOpen(false)}
            />

            <MobileMenuButton
                onClick={() => setIsMobileOpen(true)}
            >
                <RxHamburgerMenu />
            </MobileMenuButton>

            <SidebarContainer $open={isMobileOpen}>

                <SideBarItemsCont>

                    <MenuContainer>

                        {menuItems.top.map((item) => {

                            const Icon = item.icon;

                            if (!item.children?.length) {
                                return (
                                    <StyledNavLink
                                        key={item.id}
                                        to={item.path}
                                        end
                                    >
                                        {Icon && (
                                            <Icon size={item.iconSize || 23} />
                                        )}

                                        <span>
                                            {item.label}
                                        </span>
                                    </StyledNavLink>
                                );
                            }

                            return (
                                <DropdownContainer key={item.id}>

                                    <DropdownButton
                                        type="button"
                                        $open={openMenus[item.id]}
                                        onClick={() =>
                                            toggleMenu(item.id)
                                        }
                                    >
                                        {Icon && (
                                            <Icon
                                                size={
                                                    item.iconSize || 23
                                                }
                                            />
                                        )}

                                        <span>
                                            {item.label}
                                        </span>

                                        <IoChevronDown
                                            size={17}
                                            className="chevron"
                                        />
                                    </DropdownButton>

                                    <DropdownContent
                                        $open={openMenus[item.id]}
                                    >
                                        {item.children.map((child) => (
                                            <DropdownLink
                                                key={child.id}
                                                to={child.path}
                                                end
                                            >
                                                {child.label}
                                            </DropdownLink>
                                        ))}
                                    </DropdownContent>

                                </DropdownContainer>
                            );
                        })}

                    </MenuContainer>

                    <BottomMenu>

                        {menuItems.bottom.map((item) => {

                            const Icon = item.icon;

                            if (!item.children?.length) {
                                return (
                                    <StyledNavLink
                                        key={item.id}
                                        to={item.path}
                                        end
                                    >
                                        {Icon && (
                                            <Icon size={item.iconSize || 23} />
                                        )}

                                        <span>
                                            {item.label}
                                        </span>
                                    </StyledNavLink>
                                );
                            }

                            return (
                                <DropdownContainer key={item.id}>

                                    <DropdownButton
                                        type="button"
                                        $open={openMenus[item.id]}
                                        onClick={() =>
                                            toggleMenu(item.id)
                                        }
                                    >
                                        {Icon && (
                                            <Icon
                                                size={
                                                    item.iconSize || 23
                                                }
                                            />
                                        )}

                                        <span>
                                            {item.label}
                                        </span>

                                        <IoChevronDown
                                            size={17}
                                            className="chevron"
                                        />
                                    </DropdownButton>

                                    <DropdownContent
                                        $open={openMenus[item.id]}
                                    >
                                        {item.children.map((child) => (
                                            <DropdownLink
                                                key={child.id}
                                                to={child.path}
                                                end
                                            >
                                                {child.label}
                                            </DropdownLink>
                                        ))}
                                    </DropdownContent>

                                </DropdownContainer>
                            );
                        })}

                        <Item onClick={logout}>
                            <IoIosLogOut size={23} />

                            <span>
                                Sair
                            </span>
                        </Item>

                    </BottomMenu>

                </SideBarItemsCont>

            </SidebarContainer>
        </>
    );
}


const SidebarContainer = styled.nav`
    flex: 0 0 260px;

    width: 260px;
    height: 100vh;

    box-sizing: border-box;

    background: ${({ theme }) =>
        theme.colors.background};

    color: ${({ theme }) =>
        theme.colors.text};

    padding: 0 1rem;

    z-index: 1000;

    overflow-y: auto;

    @media (max-width: 768px) {
        transform: ${({ $open }) =>
        $open
            ? "translateX(0)"
            : "translateX(-100%)"};

        width: 280px;

        position: fixed;
        top: 0;
        left: 0;
    }
`;

const SideBarItemsCont = styled.div`
    min-height: 100%;

    padding: 70px 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const BottomMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const StyledNavLink = styled(NavLink)`
    outline: none;
    border: none;

    background: none;

    color: ${({ theme }) =>
        theme.colors.text};

    width: 100%;

    padding: 11px 15px;

    border-radius: 20px;

    display: flex;
    align-items: center;

    gap: 10px;

    cursor: pointer;

    text-decoration: none;

    transition:
        background 0.2s ease,
        color 0.2s ease;

    span {
        flex: 1;
    }

    &:hover {
        background: ${({ theme }) =>
        theme.colors.gray};
    }

    &.active {
        color: ${({ theme }) =>
        theme.colors.secondary};
        background: ${({ theme }) =>
        theme.colors.white};
        font-weight: 600;
    }

    svg {
        flex-shrink: 0;
    }
`;

const DropdownContainer = styled.div`
    width: 100%;
`;

const DropdownButton = styled.button`
    outline: none;
    border: none;

    background: none;

    color: ${({ theme }) =>
        theme.colors.text};

    width: 100%;

    padding: 11px 15px;

    border-radius: 20px;

    display: flex;
    align-items: center;

    gap: 10px;

    cursor: pointer;

    span {
        flex: 1;
        text-align: left;
    }

    .chevron {
        flex-shrink: 0;

        transition: transform 0.25s ease;

        transform: ${({ $open }) =>
        $open
            ? "rotate(180deg)"
            : "rotate(0deg)"};
    }

    &:hover {
        background: #f5f5f5;
    }
`;

const DropdownContent = styled.div`
    overflow: hidden;

    max-height: ${({ $open }) =>
        $open ? "500px" : "0"};

    opacity: ${({ $open }) =>
        $open ? 1 : 0};

    transition:
        max-height 0.3s ease,
        opacity 0.2s ease;

    padding-left: 30px;
`;

const DropdownLink = styled(NavLink)`
    display: flex;
    align-items: center;

    width: 100%;

    padding: 8px 15px;

    border-radius: 15px;

    color: ${({ theme }) =>
        theme.colors.text};

    text-decoration: none;

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    transition: background 0.2s ease;

    &:hover {
        background: ${({ theme }) =>
        theme.colors.gray};
    }

    &.active {
        color: ${({ theme }) =>
        theme.colors.secondary};
        background: ${({ theme }) =>
        theme.colors.white};
        font-weight: 600;
    }
`;

const Item = styled.button`
    outline: none;
    border: none;

    background: none;

    color: red;

    width: 100%;

    padding: 11px 15px;

    border-radius: 20px;

    display: flex;
    align-items: center;

    gap: 10px;

    cursor: pointer;

    span {
        flex: 1;
        text-align: left;
    }

    &:hover {
        background: ${({ theme }) =>
        theme.colors.gray};
    }
`;

const MobileMenuButton = styled.button`
    display: none;

    position: fixed;

    top: 15px;
    left: 15px;

    width: 42px;
    height: 42px;

    border: none;
    border-radius: 10px;

    background: ${({ theme }) =>
        theme.colors.secondary};

    color: ${({ theme }) =>
        theme.colors.primary};

    font-size: 22px;

    cursor: pointer;

    z-index: 1100;

    @media (max-width: 768px) {
        display: flex;

        align-items: center;
        justify-content: center;
    }
`;

const MobileOverlay = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: ${({ $open }) =>
        $open ? "block" : "none"};

        position: fixed;

        inset: 0;

        background: rgba(0, 0, 0, 0.35);

        z-index: 999;
    }
`;