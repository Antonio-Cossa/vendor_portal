import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { IoChevronDown } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { IoIosCheckmark } from "react-icons/io";

export default function Filter({
    name,
    id,
    onChange,
    possibleStatus = [],
}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(
        possibleStatus[0] || null
    );

    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleSelect = (item) => {
        setSelected(item);
        setOpen(false);

        if (onChange) {
            onChange({
                target: {
                    name,
                    id,
                    value: item.value,
                },
            });
        }
    };

    return (
        <Wrapper ref={containerRef}>
            <FilterLabel>
                <CiFilter size={20} />

                <span>
                    {name}
                </span>
            </FilterLabel>

            <SelectWrapper>
                <SelectButton
                    type="button"
                    onClick={() => setOpen(!open)}
                    $open={open}
                >
                    <span>
                        {selected?.label}
                    </span>

                    <IoChevronDown
                        size={17}
                        className="chevron"
                    />
                </SelectButton>

                {open && (
                    <Dropdown>
                        {possibleStatus.map((item) => (
                            <Option
                                key={item.value}
                                type="button"
                                $selected={
                                    selected?.value === item.value
                                }
                                onClick={() =>
                                    handleSelect(item)
                                }
                            >
                                <span>
                                    {item.label}
                                </span>

                                {selected?.value === item.value && (
                                    <Check>
                                        <IoIosCheckmark />
                                    </Check>
                                )}
                            </Option>
                        ))}
                    </Dropdown>
                )}
            </SelectWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const FilterLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;

    color: ${({ theme }) =>
        theme.colors.primary};

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    white-space: nowrap;

    svg {
        color: ${({ theme }) =>
        theme.colors.primary};
    }
`;

const SelectWrapper = styled.div`
    position: relative;
`;

const SelectButton = styled.button`
    min-width: 190px;
    height: 38px;

    padding: 0 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    border: 1px solid #dedede;
    border-radius: 8px;

    background: ${({ theme }) =>
        theme.colors.white};

    color: ${({ theme }) =>
        theme.colors.secondary};

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    cursor: pointer;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        border-color: #c8c8c8;
    }

    &:focus {
        outline: none;
        border-color: #bdbdbd;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.04);
    }

    .chevron {
        transition: transform 0.2s ease;

        transform: ${({ $open }) =>
        $open
            ? "rotate(180deg)"
            : "rotate(0deg)"};
    }
`;

const Dropdown = styled.div`
    position: absolute;

    top: calc(100% + 4px);
    left: 0;

    width: 100%;

    padding: 6px 0;

    background: ${({ theme }) =>
        theme.colors.white};

    border: 1px solid #e1e1e1;
    border-radius: 8px;

    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.08);

    z-index: 100;

    overflow: hidden;
`;

const Option = styled.button`
    width: 100%;

    min-height: 37px;

    padding: 0 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border: none;
    background: ${({ $selected }) =>
        $selected ? "#f5f5f5" : "transparent"};

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.fontSizes.sm};

    text-align: left;

    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

const Check = styled.span`
    font-size: 17px;

    color: ${({ theme }) =>
        theme.colors.secondary};
`;