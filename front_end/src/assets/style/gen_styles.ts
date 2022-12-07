// General styling used
import { css } from "styled-components";
import { StateInterface, IconStyle } from "../interfaces/patterns";
import { colors, fonts, properties } from "./themes";

const DateTheme = css`
    width: 8rem;
    margin: 0.25rem;
    text-align: center;
    font-family: ${fonts.primary};
    font-size: ${fonts.size.small};
    border-radius: ${properties.radius.light};
`;

const CenterAlignment = css`
    justify-content: center;
    align-items: center;
    text-align: center;
`

const AnimButton = css`
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

const AnimButton2 = css`
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

const componentFill = css`
    width: 100%;
    height: 100%;
`

const IconPattern = css`
    height: ${(
        (props: IconStyle)=>
            props.small?
                properties.size.small:
                properties.size.normal)};
    margin: ${(
        (props: IconStyle)=>
            props.small?'0':'0.1')}em;
    padding:  ${(
        (props: IconStyle)=>
            props.small?'0.1em 0.25em':'0.2em 0.25em')};
    color: ${colors.txt.primary};
    border-radius: ${properties.radius.extlight};
    background: ${(
        (props: IconStyle)=>
            props.state?
                colors.bg.transparent:
                colors.btns.btn1.normal)};
`;

const VerticalOrient = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${CenterAlignment}
`

const HorizontalOrient = css`
    height: 100%;
    display: flex;
    flex-direction: row;
    ${CenterAlignment}
`

export {
    DateTheme,
    CenterAlignment,
    AnimButton,
    AnimButton2,
    componentFill,
    IconPattern,
    VerticalOrient,
    HorizontalOrient
}
