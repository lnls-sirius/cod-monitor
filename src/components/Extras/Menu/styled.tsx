import styled from "styled-components";
import { colors, fonts } from "../../../assets/theme";

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  padding-top: 5px;
  font-size: ${fonts.size.big};
  font-family: ${fonts.primary};
  color: ${colors.txt.secondary};
`;

export const Content = styled.div`
  padding-left: 30px;
`;
