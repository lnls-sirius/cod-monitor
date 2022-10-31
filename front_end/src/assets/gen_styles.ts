import {css} from "styled-components";
import { SelectedInterface } from "../controllers/Patterns/interfaces";
import { colors, fonts, properties } from "./themes";

export const DateTheme = css`
    width: 8rem;
    margin: 0.5rem;
    text-align: center;
    font-family: ${fonts.primary};
    font-size: ${fonts.size.small};
    border-radius: ${properties.radius.light};
`;


export const AnimButton2 = css`
    border: none;
    border-radius: ${properties.radius.light};
    text-align: center;
    font-family: ${fonts.primary};
    color: ${colors.txt.primary};
    transition: 0.2s;
    background: ${
        (props: SelectedInterface) =>
            props.selected?
            colors.btns.btn3.active:
            colors.btns.btn3.normal};
    ${
        (props: SelectedInterface) =>
            props.selected?
            '':
            `&:hover{
                background-color: ${colors.btns.btn3.hover};
                transform: translateY(-.2rem);
            }
            &:active{
                background-color: ${colors.btns.btn3.active};
            }`
    }
`

export const AnimButton = css`
    border: none;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: ${fonts.primary};
    color: ${colors.bg.white};
    border-radius: ${properties.radius.extlight};
    transition: 0.2s;
    &:hover{
        background-color: ${colors.btns.btn2.hover};
        transform: translateY(-.2rem);
    }
    &:active{
        background-color: ${colors.btns.btn2.active};
    }
`
