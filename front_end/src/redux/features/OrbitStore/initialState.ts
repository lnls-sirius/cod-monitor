export interface orbitStore{
    signatures: string,
    change_orbit: boolean,
    change_cod_orbit: boolean
}

const initialState: orbitStore = {
    signatures: '{}',
    change_orbit: false,
    change_cod_orbit: false
}

export default initialState;
