import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconPattern } from "../../../assets/style/gen_styles";

export const InfoWrapper = styled.div`
  text-align: left;
  max-height: 50vh;
  overflow-y: scroll;
`

export const GroupWrapper = styled.div` 
  margin: 0em 0.25em;
`

export const Icon = styled(FontAwesomeIcon)`
    ${IconPattern}
`;

export const Title = styled.div`
    display: flex;
    font-weight: 900;
    justify-content: center;
    align-items: center;
    min-width: 1em;
`;

export const TitleText = styled.div`
  margin-left: 1em;
`;