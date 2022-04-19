import styled from "styled-components";
import { colors } from "../../assets/theme";

export const LogoWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const ImageWrapper = styled.img`
  height: 40px;
  margin: 4px;
  padding: 2px; 
  background-color: ${colors.bg.white};
  border-radius: 10px;
`;
