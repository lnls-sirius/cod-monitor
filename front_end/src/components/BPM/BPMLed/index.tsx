import { useSelector } from "react-redux";

import Led from "../../Patterns/Led";
import { getBpmName, objectExists, reverseAxis } from "../../../controllers/Patterns/functions";
import { DictState, InitLed } from "../../../assets/interfaces/patterns";
import { StoreInterface } from "../../../redux/storage/store";

const defaultProps: InitLed = {
    id: '',
    axis: 'X',
    ledProps: {},
    othAxis: {},
    mountData: () => null,
    updateData: ()=> null,
}

const BPMLed: React.FC<InitLed> = (props) => {
    // Load the states of one led representing a BPM
    const bpmList = useSelector((state: StoreInterface) => state.bpm.bpm_list);

    //Initialize one BPM led in one axis
    function initBPMAxis(list: DictState, states: DictState, name_waxis: string, bpm_name: string): void {
        if(objectExists(states, name_waxis)){
            list[bpm_name] = states[name_waxis];
        }else{
            list[bpm_name] = false;
        }
    }

    //Initialize one BPM led in both axis
    function initStates(bpm_name: string): boolean {
        const states: DictState = JSON.parse(bpmList);

        let name_waxis = getBpmName(
            bpm_name, props.axis);
        initBPMAxis(
            props.ledProps, states, name_waxis, bpm_name);

        name_waxis = getBpmName(
            bpm_name, reverseAxis(props.axis));
        initBPMAxis(
            props.othAxis, states, name_waxis, bpm_name);

        return props.ledProps[bpm_name];
      }

      return (
        <Led
          id={props.id}
          mountData={props.mountData}
          updateData={props.updateData}
          state={initStates(props.id)} />
      );
}

BPMLed.defaultProps = defaultProps;
export default BPMLed;
