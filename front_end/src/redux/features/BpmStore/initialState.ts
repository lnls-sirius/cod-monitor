export interface bpmStore{
    bpm_list: string
    change_bpm: boolean
}

const initialState: bpmStore = {
    bpm_list: '{}',
    change_bpm: false
}

export default initialState;
