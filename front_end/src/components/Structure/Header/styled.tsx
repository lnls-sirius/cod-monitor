import styled from "styled-components";
import { CenterAlignment } from "../../../assets/style/gen_styles";
import { colors} from "../../../assets/style/themes";

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  ${CenterAlignment}
  background-image: ${colors.bg.secondary};
`;
