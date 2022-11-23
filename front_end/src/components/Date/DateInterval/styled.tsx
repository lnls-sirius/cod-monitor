import styled from "styled-components";
import { CenterAlignment } from "../../../assets/style/gen_styles";
import { colors } from "../../../assets/style/themes";

export const TextWrapper = styled.div`
    display: flex;
    ${CenterAlignment}
    color: ${colors.txt.primary};
    margin: 0em 0.5em;
`;
