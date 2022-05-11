import React from "react";
import { useSelector} from 'react-redux';
import * as S from './styled';

const DateInterval: React.FC = () => {
  const startDate = useSelector((state: any) => state.time.start_date);
  const endDate = useSelector((state: any) => state.time.end_date);

  return(
    <S.TextWrapper>
      From {startDate.toLocaleString()} to {endDate.toLocaleString()}
    </S.TextWrapper>
  );
};

export default DateInterval;
