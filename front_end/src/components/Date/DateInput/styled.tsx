import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { DateTheme } from "../../../assets/style/gen_styles";

export const InputTime = styled(DatePicker)`
    ${DateTheme}
`;
