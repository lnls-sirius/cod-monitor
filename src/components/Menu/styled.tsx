import styled from "styled-components";
import { colors, fonts } from "../../assets/theme";

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  padding-top: 15px;
  font-size: 25px;
  font-family: ${fonts.primary};
  color: ${colors.txt.primary};
`;

export const Content = styled.div`
  padding-left: 30px;
`;
