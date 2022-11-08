import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { colors, fonts } from "../../../assets/style/themes";

export const Text = styled.div`
    color: ${colors.bg.white};
    text-align: center;
    font-family: ${fonts.primary};
    font-size: ${fonts.size.small};
`;

export const Icon = styled(FontAwesomeIcon)`
`
