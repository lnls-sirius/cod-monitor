import React from "react";
import { iconList } from "../../../assets/constants/icons";
import { InfoTypeInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: InfoTypeInterface = {
  type: 'BPM'
}

const Info: React.FC<InfoTypeInterface> = (props) => {
  // Display the Page Documentation

  // Display general information about the BPM Drift page
  function bpmPageInfo(): React.ReactElement {
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
            <li>k: Diff Ref date</li>
          </ul>
        </S.GroupWrapper>
      </S.GroupWrapper>);
  }

  // Display general information about the Orbit Drift page
  function orbitPageInfo(): React.ReactElement {
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

  // Display information about the date modification
  function IntervalInfo(): React.ReactElement {
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
            <li>Diff Ref: Reference date used to get
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
                <li>1 + CLICK (On the desired date): Select a new Marker-1 date</li>
                <li>2 + CLICK (On the desired date): Select a new Marker-2 date</li>
                <li>D + CLICK (On the desired date): Select a new Diff Ref date</li>
              </ul>
            </li>:''
          }
        </ul>
      </S.GroupWrapper>);
  }

  // Display information about the BPM selection
  function bpmInfo(): React.ReactElement {
    return (
      <S.GroupWrapper>
        <S.Title>
          <S.Icon
            icon={iconList['list']}
            onClick={()=>null}
            state={false}
            small={true}/>
          <S.Tab/>BPM Selection
        </S.Title>
        <ul>
          <li>
            BPM selection colors
            <ul>
              <li>Dark Green: BPM unselected</li>
              <li>Light Green: BPM selected</li>
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
          <li>
            Selection of several BPMs<br/>
            <S.Tab/>Click near one led and drag the mouse up to the top of a second
            led. All the leds in the drag area will toggle their selection.
          </li>
        </ul>
      </S.GroupWrapper>);
  }

  // Display information about the signatures and how to filter them
  function signatureInfo(): React.ReactElement {
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
            Selection of Signatures<br/>
            <S.Tab/>Click on the button with the plus button or anywhere in the desired row.
            The selected signature will change color and allow the user to remove it from the chart.
            The selection of several signatures can be made by clicking in a row and
            dragging the mouse up to a second row. All the signatures in the drag area
            will toggle their selection.
          </li>
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

  // Display information about the chart interaction
  function chartInfo(): React.ReactElement {
    return (
      <S.GroupWrapper>
        <S.Title>
          <S.Icon
            icon={iconList['chart']}
            onClick={()=>null}
            state={false}
            small={true}/>
          <S.Tab/> Chart Interaction
        </S.Title>
        <S.GroupWrapper>
          <S.Tab/>A Button: Reset the zoom and drag interactions and
            rescale the graph to fit the entirety of the data.
        </S.GroupWrapper>
        Shortcuts
          <ul>
            <li>SHIFT + DRAG (To a desired location): Drag the
              chart on the X or Y direction</li>
            <li>CTRL + DRAG (Forming a desired area): Zoom the
              chart on the selected dragged area</li>
            <li>SHIFT + SCROLL: Zoom the chart on the
              selected scrolled area</li>
          </ul>
      </S.GroupWrapper>);
  }

  return (
    <S.InfoWrapper>
      {props.type=='BPM'?
        bpmPageInfo(): orbitPageInfo()}
      {IntervalInfo()}
      {props.type=='BPM'?
        bpmInfo():signatureInfo()}
      {chartInfo()}
    </S.InfoWrapper>
  );
};

Info.defaultProps = defaultProps;
export default Info;
