import styled from "styled-components";
import { colors, properties } from "../../assets/theme";

export const LedWrapper = styled.button`
    background: ${(props: { ledState: any; }) => props.ledState?colors.bg.led.on:colors.bg.led.off};
    border-radius: ${properties.radius.high};
    border: none;
    width: 25px;
    height: 25px;
    margin: 5px;
    background-color:;
`;
