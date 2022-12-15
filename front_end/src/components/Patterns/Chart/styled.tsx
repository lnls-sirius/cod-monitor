import styled from "styled-components";
import { AnimButton } from "../../../assets/style/gen_styles";
import { colors, properties } from "../../../assets/style/themes";

const Button = styled.button`
  position: relative;
  bottom: 2em;
  z-index: 1;
  visibility: visible;
  min-width: 2em;
  background: ${colors.btns.btn1.normal};
  color: ${colors.txt.primary};
  text-align: center;
  margin: 0.25em 0.5em;
  ${AnimButton};
`

const Chart = styled.canvas`
  width: 100%;
  border-radius: ${properties.radius.extlight};
  background-color: ${colors.bg.white};
`;

const ChartWrapper = styled.div`
  width: 100%;
`

export {
  Chart,
  ChartWrapper,
  Button
}
