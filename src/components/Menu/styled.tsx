import styled from "styled-components";
import { colors } from "../../assets/theme";

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  padding-top: 25px;
  font-size: 30px;
  font-family: 'Akshar', sans-serif;
  color: ${colors.txt.primary};
`;

export const Content = styled.div`
  padding-left: 30px;
`;