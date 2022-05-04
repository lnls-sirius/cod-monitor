import styled from "styled-components";
import { colors, properties } from "../../assets/theme";

export const LedWrapper = styled.button`
    background: ${(props: { ledState: any; }) => props.ledState?colors.bg.tertiary:colors.bg.green};
    border-radius: ${properties.radius.high};
    width: 25px;
    height: 25px;
    margin: 5px;
    background-color:;
`;
