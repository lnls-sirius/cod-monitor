import styled from "styled-components";
import { colors, fonts } from "../../assets/theme";

export const FooterWrapper = styled.div`
  position: fixed;
  padding-bottom: 15px;
  bottom: 0;
  width: 200px;
  font-size: 13px;
  font-family: ${fonts.primary};
  text-align: center;
  color: ${colors.txt.primary}
`;
