export interface bpmStore{
    bpm_list: string;
    leds: string;
    change_bpm: boolean;
}

const initialState: bpmStore = {
    bpm_list: '{}',
    leds: '{}',
    change_bpm: false
}

export default initialState;
