export interface bpmStore{
    leds: string;
    list: string;
    colors: string;
}

const initialState: bpmStore = {
    list: '{}',
    colors: '{}',
    leds: '{}'
}

export default initialState;
