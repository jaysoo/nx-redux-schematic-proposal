import React, { ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

export const StyledButton = styled.button`
  border-radius: 4px;
  border: 1px #ccc solid;
  background-color: #fafafa;
  font-size: 0.9rem;
  height: 2rem;

  :hover {
    background-color: #c5deff;
    border-color: #45648d;
  }
`;

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
};

export default Button;
