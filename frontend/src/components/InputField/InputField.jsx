import React from 'react';
import styled from 'styled-components';

export const InputField = (props) => {
  return (
    <Wrapper>
      <Label>{props.label}</Label>
      <Input placeholder={props.placeholder} type={props.type} $width={props.width} value={props.value} onChange={props.onChange} onKeyDown={props.onKeyDown} maxLength={props.maxLength} ref={props.ref} required={props.required} autoComplete={props.autoComplete} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  text-align: left !important;
`;

const Input = styled.input`
  border-radius: ${({ theme }) => theme.borderRadius};
  width: ${({ $width }) => $width || "100%"} ;
  height: 40px;
  padding: ${({ theme }) => theme.spacing.xs} 8px;
  background: none;
  border: 1px solid #d8dae0;
  outline: none;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
`;
