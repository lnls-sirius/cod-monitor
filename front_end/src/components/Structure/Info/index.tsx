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
          <S.Tab/>This web interface is used for the visualization of the 
          variation of the position of a BPM relative to a selected date,
          this variation which is called Difference function.
        </S.GroupWrapper>
        <S.GroupWrapper>
          <ul>
            <S.Highlight>
              diff(x) = f(x) - f(k)
            </S.Highlight>
            <li>diff(x): Difference Function</li>
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
          <S.Tab/>This web interface is used for the visualization of the
          disturbed closed orbits (COD) in the axis X and Y 
          between two dates chosen by the user and compare, by Inner Product, 
          several simulated signatures with the
          COD rebuilt from the Storage Ring.
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
          <S.Tab/>Date Modification
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
                Marker-2 date is automatically set based on the interval 
                period selected after the Marker-1 date.   
              </li>
              <li>
                End: Date modification allowed on the Marker-2 date. 
                Marker-1 date is automatically set based on the interval 
                period selected before the Marker-2 date.   
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
                <li>S + CLICK (On the desired date): Select a new Start date</li>
                <li>E + CLICK (On the desired date): Select a new End date</li>
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
          <S.Tab/>BPM Modification
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
            Header Buttons
            <ul>
              <li>Top: Select all the BPMs of a section.</li>
              <li>Left: Select all the BPM with the same identification in all the sections.</li>              
            </ul> 
          </li>
          <li>
            Axis Selection
            <ul>
              <li>X: The selection is being made only in the X axis.</li>
              <li>Y: The selection is being made only in the Y axis</li>
              <li>X & Y: The selected BPMs are selected in both axis</li>              
            </ul> 
          </li>
        </ul> 
      </S.GroupWrapper>);  
  }

  function basicSignatureInfo(): React.ReactElement {
    return (
      <S.GroupWrapper>
        <S.Title>   
          Signature Information
        </S.Title>  
        <S.GroupWrapper>
          <S.Tab/>Element signatures are simulated applying a kick to the X or the Y
          axis of Correctors, Dipoles, Quadrupoles and Sextupoles Magnets,
          obtaining at the end of the simulation a CODX and a CODY.
          <br/>
          <S.Tab/>Family signatures are simulated applying an equal kick to every 
          magnet with the same power source. 
        </S.GroupWrapper>
        <S.GroupWrapper>
          <S.Tab/>Header Buttons: Order the list by crescent or decrescent order
          based on the element represented by the chosen header.
        </S.GroupWrapper>
        <ul>
          <li>
            Filter Options
            <ul>
              <li>Name Filter: Uses Glob pattern (The linux bash standart feature 
                for file matching and content search) to filter the 
                names. More about the Glob pattern in:
                <a href="https://linuxhint.com/bash_globbing_tutorial/">
                  https://linuxhint.com/bash_globbing_tutorial/</a>.
              </li>
              <li>Magnets: 
                <ul>
                  <li>C: Toggles the visibility of all the signatures 
                    made with Correctors.</li>
                  <li>D: Toggles the visibility of all the signatures 
                    made with Dipoles.</li>
                  <li>Q: Toggles the visibility of all the signatures 
                    made with Quadrupoles.</li>
                  <li>S: Toggles the visibility of all the signatures 
                    made with Sextupoles.</li>              
                </ul>
              </li>
              <li>Chart: Toggles the visibility of all the signatures 
                already selected by the user.</li>
              <li>Axis: 
                <ul>
                  <li>X: Toggles the visibility of all the signatures 
                that have the kick on the X axis.</li>
                  <li>Y: Toggles the visibility of all the signatures 
                that have the kick on the Y axis.</li>              
                </ul> 
              </li>              
            </ul> 
          </li>
        </ul> 
      </S.GroupWrapper>);  
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
