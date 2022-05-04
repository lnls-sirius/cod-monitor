import styled from "styled-components";
import { colors, properties } from "../../assets/theme";

export const LedWrapper = styled.button`
    background: ${(props: { ledState: any; }) => props.ledState?colors.bg.green:colors.bg.tertiary};
    border-radius: ${properties.radius.high};
    width: 25px;
    height: 25px;
    margin: 5px;
    background-color:;
`;
