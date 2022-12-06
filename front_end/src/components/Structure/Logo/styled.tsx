import styled from "styled-components";
import { colors, properties } from "../../../assets/style/themes";

export const LogoWrapper = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
  display: flex;
  align-items: center;
  padding: 1em;
`;

export const ImageWrapper = styled.img`
  height: 35px;
  margin: 4px;
  padding: 2px;
  background-color: ${colors.bg.white};
  border-radius: ${properties.radius.extlight};
`;
