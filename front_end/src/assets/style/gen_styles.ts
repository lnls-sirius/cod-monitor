// General styling used
import {css} from "styled-components";
import { StateInterface } from "../interfaces/patterns";
import { colors, fonts, properties } from "./themes";

export const DateTheme = css`
    width: 8rem;
    margin: 0.5rem;
    text-align: center;
    font-family: ${fonts.primary};
    font-size: ${fonts.size.small};
    border-radius: ${properties.radius.light};
`;

export const CenterAlignment = css`
    justify-content: center;
    align-items: center;
    text-align: center;
`

export const AnimButton2 = css`
    border: none;
    border-radius: ${properties.radius.light};
    text-align: center;
    font-family: ${fonts.primary};
    color: ${colors.txt.primary};
    transition: 0.2s;
    background: ${
        (props: StateInterface) =>
            props.state?
            colors.btns.btn2.active:
            colors.btns.btn2.normal};
    ${
        (props: StateInterface) =>
            props.state?
            '':
            `&:hover{
                background: ${colors.btns.btn2.hover};
                transform: translateY(-.2rem);
            }
            &:active{
                background: ${colors.btns.btn2.active};
            }`
    }
`

export const AnimButton = css`
    border: none;
    ${CenterAlignment}
    font-family: ${fonts.primary};
    color: ${colors.txt.primary};
    border-radius: ${properties.radius.extlight};
    transition: 0.2s;
    &:hover{
        background: ${colors.btns.btn1.hover};
        transform: translateY(-.2rem);
    }
    &:active{
        background: ${colors.btns.btn1.active};
    }
`

export const componentFill = css`
    width: 100%;
    height: 100%;
`
