export interface bpmStore{
    leds: string;
    list: string;
    colors: string;
    change_bpm: boolean;
}

const initialState: bpmStore = {
    list: '{}',
    colors: '{}',
    leds: '{}',
    change_bpm: false
}

export default initialState;
