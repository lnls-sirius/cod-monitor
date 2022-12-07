import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconPattern } from "../../../assets/style/gen_styles";

const InfoWrapper = styled.div`
  text-align: left;
  max-height: 50vh;
  overflow-y: scroll;
`

const GroupWrapper = styled.div` 
  margin: 1em 0.25em;
`

const Icon = styled(FontAwesomeIcon)`
    ${IconPattern}
`;

const Title = styled.div`
    display: flex;
    font-weight: 900;
    justify-content: center;
    align-items: center;
    min-width: 1em;
    margin: 2em 0em;
`;

const Tab = styled.span`
  margin: 0.75em;
`

const Highlight = styled.div`
  font-style: italic;
  text-align: center;
`

export {
  InfoWrapper,
  GroupWrapper,
  Icon,
  Title,
  Tab,
  Highlight
}