import styled from "styled-components";
import { colors, properties } from "../../../assets/theme";

export const ItemWrapper = styled.div`
    display: flex;
    margin-top: 0.2rem;
`;

export const IntervalBtn = styled.button`
    border: .1px solid ${colors.bg.transparent};
    border-radius: ${properties.radius.light};
    margin: 0rem 0.2rem;
    padding: 0rem 0.5rem;
    background: ${(props: { selected: any; }) => props.selected?colors.btns.btn3.active:colors.btns.btn3.normal};
    &:hover{
        background-color: ${colors.btns.btn3.hover};
        transform: translateY(-.2rem);
    }
    &:active{
        background-color: ${colors.btns.btn3.active};
    }
`;
