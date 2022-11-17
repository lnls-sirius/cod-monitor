import styled from "styled-components";
import { colors, properties } from "../../../assets/style/themes";

export const Chart = styled.canvas`
  margin: 0.5em 0em;
  border-radius: ${properties.radius.extlight};
  background-color: ${colors.bg.white};
`;
