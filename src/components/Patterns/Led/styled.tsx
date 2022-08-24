import styled from "styled-components";
import { colors, properties } from "../../../assets/theme";
import { LedInterface } from "../../../controllers/Patterns/interfaces";

export const LedWrapper = styled.button`
    background: ${(props: LedInterface) => props.state?
        colors.led.on.normal:colors.led.off.normal};
    border-radius: ${properties.radius.high};
    border: none;
    width: 25px;
    height: 25px;
    margin: 5px;
    &:hover{
        background: ${(props: LedInterface) => props.state?
            colors.led.on.hover:colors.led.off.hover};
    }
`;
