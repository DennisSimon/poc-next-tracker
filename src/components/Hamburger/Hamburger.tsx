import { styled } from "@mui/material/styles";
import * as React from "react";

interface Props {
  isOpen: boolean;
  onClick?: () => void;
}

export const Hamburger = (props: Props) => {
  return (
    <StyledHamburger isOpen={props.isOpen} onClick={props.onClick}>
      <span />
      <span />
      <span />
    </StyledHamburger>
  );
};

const StyledHamburger = styled("button")<Props>(
  ({ theme, isOpen }) => `
    background: none;
    border: 0;
    width: 22px;
    height: 16px;
    position: relative;
    z-index: 1201;
    padding: 0;
    outline: none;
    user-select: none;
    cursor: pointer;

    span {
        display: block;
        background-color: ${theme.palette.text.primary};
        width: 100%;
        height: 2px;
        margin-bottom: 5px;
        transform-origin: 4px 0px;
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
            background-color 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

        ${
          isOpen &&
          `
            opacity: 1;
            transform: rotate(45deg) translate(0, 1px);

            &:nth-child(2) {
                opacity: 0;
                transform: rotate(0deg) scale(0.2, 0.2);
            }

            &:last-child {
                transform: rotate(-45deg) translate(1px, -4px);
            }
        `
        }
    }
`
);
