import styled from "styled-components";
import { colors } from "../../../assets/style/themes";

const ChartWrapper = styled.div`
    min-height: 85vh;
`;

const TextWrapper = styled.div`
    color: ${colors.txt.primary};
    margin: 1em;
`

export {
    ChartWrapper,
    TextWrapper
}
