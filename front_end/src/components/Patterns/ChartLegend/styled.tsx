import styled from "styled-components";
import { colors, properties } from "../../../assets/style/themes";

export const Square = styled.div`
    height: 1.5em;
    min-width: 1.5em;
    border: 1px solid ${colors.bg.white};
    border-radius: ${properties.radius.light};
    background-color: ${(props: { color: string; }) => props.color};
`

export const ItemWrapper = styled.div`
    display: flex;
    min-height: 2.75em;
    margin: 0.25em;
    padding: 0.5em;
    border-radius: ${properties.radius.extlight};
    color: ${colors.txt.primary};
    background: ${
        (props: { isVisible: boolean; }) =>
        props.isVisible?colors.bg.secondary:colors.bg.secondary_inac};
    align-items: center;
    justify-content: center;
    &:hover{
        background: ${colors.bg.tertiary};
    }
`
