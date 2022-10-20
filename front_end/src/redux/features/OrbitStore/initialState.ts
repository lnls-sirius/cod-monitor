export interface orbitStore{
    signatures: string,
    change_orbit: boolean
}

const initialState: orbitStore = {
    signatures: '{}',
    change_orbit: false
}

export default initialState;
