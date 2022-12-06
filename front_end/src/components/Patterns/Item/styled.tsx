import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimButton, IconPattern, CenterAlignment } from "../../../assets/style/gen_styles";
import { fonts } from "../../../assets/style/themes";


export const ItemWrapper = styled.div`
    display: flex;
    ${CenterAlignment}
    padding: 0.25em;
    font-family: ${fonts.primary};
`;

export const Icon = styled(FontAwesomeIcon)`
    ${IconPattern}
    ${AnimButton}
`;
