import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fonts, properties } from "../../../assets/theme";

export const InputTime = styled(DatePicker)`
    width: 8rem;
    margin: 0.5rem;
    display: flex;
    text-align: center;
    font-family: ${fonts.primary};
    font-size: ${fonts.size.small};
    border-radius: ${properties.radius.light};
`;
