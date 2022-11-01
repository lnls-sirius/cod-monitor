import styled from "styled-components";
import { colors, properties } from "../../../assets/style/themes";

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const ImageWrapper = styled.img`
  height: 35px;
  margin: 4px;
  padding: 2px;
  background-color: ${colors.bg.white};
  border-radius: ${properties.radius.extlight};
`;
