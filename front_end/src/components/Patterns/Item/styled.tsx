import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { colors, fonts, properties } from "../../../assets/theme";

export const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25em;
    font-family: ${fonts.primary};
`;

export const Icon = styled(FontAwesomeIcon)`
    height: ${(
        (props: {state: boolean, small: boolean|undefined})=>
            props.small?
                properties.size.small:
                properties.size.normal)};
    width: 1.5em;
    margin: ${(
        (props: {state: boolean, small: boolean|undefined})=>
            props.small?'0':'0.1')}em;
    padding: ${(
        (props: {state: boolean, small: boolean|undefined})=>
            props.small?'0.1':'0.25')}em;
    color: ${colors.bg.white};
    border-radius: ${properties.radius.extlight};
    background-color: ${(
        (props: {state: boolean, small: boolean|undefined})=>
            props.state?
                colors.bg.transparent:
                colors.btns.btn1.normal)};
    &:hover{
        background-color: ${colors.btns.btn1.hover};
    }
    &:active{
        background-color: ${colors.btns.btn1.active};
    }
`;
