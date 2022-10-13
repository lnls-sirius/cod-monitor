import styled from "styled-components";
import { colors, fonts, properties } from "../../../assets/theme";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const Select = styled.button`
    text-align: center;
    border-radius: ${properties.radius.extlight};
    padding: 0rem .8rem;
    margin: 0.5rem .1rem;
    border: none;
    font-family: ${fonts.primary};
    color: ${colors.txt.primary};
    background: ${(props: { selected: boolean }) => props.selected?colors.btns.btn3.active:colors.btns.btn3.normal};
    &:hover{
        background-color: ${colors.btns.btn3.hover};
        transform: translateY(-.2rem);
    }
    &:active{
        background-color: ${colors.btns.btn3.active};
    }
`
