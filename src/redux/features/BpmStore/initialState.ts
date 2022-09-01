export interface bpmStore{
    leds: string;
    list: string;
    change_bpm: boolean;
}

const initialState: bpmStore = {
    list: '{}',
    leds: '{}',
    change_bpm: false
}

export default initialState;
