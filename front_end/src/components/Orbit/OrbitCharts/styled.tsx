import styled from "styled-components";
import { properties } from "../../../assets/themes";

export const ChartWrapper = styled.div`
    position: relative;
    top: 0em;
    margin-left: 1em;
    width: 140vw;
    color: white;
    text-align: center;
`;

export const Chart = styled.canvas`
  width: 100%;
  height: 100%;
  margin-top: 5px;
  border-radius: ${properties.radius.extlight};
  background-color: #FFFFFF;
`;
