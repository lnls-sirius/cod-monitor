import styled from "styled-components";
import { colors, properties } from "../../../assets/style/themes";
import { StateInterface } from "../../../assets/interfaces/patterns";

export const LedWrapper = styled.button`
    background: ${(props: StateInterface) => props.state?
        colors.led.on.normal:colors.led.off.normal};
    border-radius: ${properties.radius.high};
    border: none;
    width: 2em;
    height: 2em;
    padding: 0.2em;
    &:hover{
        background: ${(props: StateInterface) => props.state?
            colors.led.on.hover:colors.led.off.hover};
    }
`;
