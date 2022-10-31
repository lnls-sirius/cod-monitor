import React, { useState } from "react";
// import { connect } from "react-redux";
// import { getColor } from "../../../controllers/Chart/functions";
// import Item from "../../Patterns/Item";
// import DateInput from "../../Date/DateInput";
// import DateShow from "../../Date/DateShow";
// import ChartLegend from "../../Patterns/ChartLegend";
// import { StoreInterface } from "../../../redux/storage/store";
// import { IntervalEditInterface, IntervalListInterface } from "../../../controllers/Time/interfaces";
// import { deleteInterval, setDateInterval } from "../../../controllers/Time/functions";
// import * as S from './styled';

// function mapStateToProps(state: StoreInterface){
//   const { date_list } = state.time;
//   return {
//     interval_list: JSON.parse(date_list)
//   }
// }

// const IntervalEdit: React.FC<IntervalEditInterface> = (props) => {
//   const [editing, setEdit] = useState<boolean>(false);

//   function toggleEdit(){
//     setEdit(!editing);
//   }

//   function setDateIntervalImp(type: string, date: Date, id?: string){
//     if(id!=undefined){
//       setDateInterval(id, type, date, props.interval_list);
//     }
//   }

//   function timeMode(type: string, date: Date, id: string){
//     if(editing){
//       return <DateInput
//         type={type}
//         date={new Date(date)}
//         setDate={setDateIntervalImp}/>;
//     }
//     return <DateShow
//       date={new Date(date)}/>;
//   }

//   return (
//     <S.TextWrapper>
//       <S.TextWrapper>
//         Start:
//           {timeMode('Start', props.start, props.id)}
//       </S.TextWrapper>
//       <S.TextWrapper>
//         End:
//           {timeMode('End', props.end, props.id)}
//       </S.TextWrapper>
//       <Item
//         icon='pencil'
//         action={toggleEdit}/>
//     </S.TextWrapper>
//   )
// }

// const OrbitInterval: React.FC<IntervalListInterface> = (props) => {

//   function listOrbitIntervals(){
//     return Object.entries(props.interval_list).map(([id, property]: any) => {
//       return (
//         <ChartLegend
//           color={getColor(id)}
//           deleteAction={() => deleteInterval(id, props.interval_list)}>
//             <IntervalEdit
//               id={id}
//               start={property.start}
//               end={property.end}
//               interval_list={props.interval_list} />
//         </ChartLegend>
//       );
//     });
//   }

//   return (
//     <S.Wrapper>
//       {listOrbitIntervals()}
//     </S.Wrapper>
//   );
// };

// export default connect(mapStateToProps)(OrbitInterval);
