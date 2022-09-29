export interface bpmStore{
    bpm_list: string;
    leds: string;
    axis: string;
    change_bpm: boolean;
}

const initialState: bpmStore = {
    bpm_list: '{}',
    leds: '{}',
    axis: 'X',
    change_bpm: false
}

export default initialState;
