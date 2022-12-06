import React from "react";
import { iconList } from "../../../assets/constants/icons";
import { InfoTypeInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: InfoTypeInterface = {
  type: 'BPM'
}

const Info: React.FC<InfoTypeInterface> = (props) => {
  // Display the Page Documentation
  
  function basicBPMPageInfo(): React.ReactElement {
    return (
      <S.GroupWrapper>
        <S.GroupWrapper>
          This web interface is used for the visualization of the 
          variation of the position of a BPM relative to a selected date,
          this variation which is called Difference function.
        </S.GroupWrapper>
        <S.GroupWrapper>
          Difference Function (diff(x))
          <ul>
            diff(x) = f(x) - f(k)
            <li>f(x): Values obtained of the PV from the Archiver</li>
            <li>x: Date (Varying from the Start date to the End date)</li>
            <li>k: Reference date</li>  
          </ul>         
        </S.GroupWrapper>
      </S.GroupWrapper>);
  }
  
  function basicOrbitPageInfo(): React.ReactElement {
    return (
      <S.GroupWrapper>
        <S.GroupWrapper>
          This web interface is used for the visualization of the
          disturbed closed orbits (COD) in the axis X and Y 
          between two dates chosen by the user and compare 
          several simulated signatures with the
          COD rebuilt from the Storage Ring.
        </S.GroupWrapper>
        <S.GroupWrapper>
          Signatures are simulated applying a kick to the X or the Y
          axis of Correctors, Dipoles, Quadrupoles and Sextupoles,
          obtaining at the end of the simulation a CODX and a CODY.
        </S.GroupWrapper>
      </S.GroupWrapper>);
  }

  function basicIntervalInfo(): React.ReactElement {
    return (
      <S.GroupWrapper>
        <S.Title>  
          <S.Icon
            icon={iconList['clock']}
            onClick={()=>null}
            state={false}
            small={true}/>
          <S.TitleText>Date Modification</S.TitleText>
        </S.Title>
        <ul>
          <li>Marker-1: {props.type=='BPM'?
            "Start date for the chart.":"Start date of the interval."}
          </li>
          <li>Marker-2: {props.type=='BPM'?
            "End date for the chart.":"End date of the interval."}</li>
          {props.type=='BPM'?
            <li>Reference: Reference date used to get 
            the value for the difference function.</li>:''}
          <li>
            Reference Date Selection:<br/>
            Options:
            <ul>
              <li>
                Start: Date modification allowed on the Marker-1 date. 
                Marker-2 date is the interval period selected after the Marker-1 date.   
              </li>
              <li>
                End: Date modification allowed on the Marker-2 date. 
                Marker-1 date is the interval period selected before the Marker-2 date.   
              </li>
              <li>
                None: Date modification allowed on the Marker-1 and Marker-2 date. 
                There is no reference by the selection of an interval period.  
              </li>  
            </ul> 
            <br/>
          </li>
          {
            props.type=='BPM'?
            <li>
              Shortcuts
              <ul>
                <li>CONTROL + CLICK (On the desired date): Select a new Start date</li>
                <li>SHIFT + CLICK (On the desired date): Select a new End date</li>
                <li>D + CLICK (On the desired date): Select a new Reference date</li>
              </ul>
            </li>:''
          }   
        </ul> 
      </S.GroupWrapper>);
  }
  
  function basicBPMInfo(): React.ReactElement {
    return (
      <S.GroupWrapper>
        <S.Title>  
          <S.Icon
            icon={iconList['list']}
            onClick={()=>null}
            state={false}
            small={true}/>
          <S.TitleText>BPM Modification</S.TitleText>
        </S.Title>
        <ul>
          <li>
            BPM selection colors
            <ul>
              <li>Green: BPM unselected</li>
              <li>Blue: BPM selected</li>              
            </ul> 
          </li>
          <li>
            Header Buttons:
            <ul>
              <li>Top: Select all the BPMs of a section.</li>
              <li>Left: Select all the BPM with the same identification in all the sections.</li>              
            </ul> 
          </li>
        </ul> 
      </S.GroupWrapper>);  
  }

  function basicSignatureInfo(): React.ReactElement {
    return <div/>
  }

  return (
    <S.InfoWrapper>
      {props.type=='BPM'?
        basicBPMPageInfo(): basicOrbitPageInfo()}
      {basicIntervalInfo()}
      {props.type=='BPM'?
        basicBPMInfo():basicSignatureInfo()}
    </S.InfoWrapper>
  );
};

Info.defaultProps = defaultProps;
export default Info;
