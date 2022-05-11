import { createSlice } from '@reduxjs/toolkit'

export const timeData = createSlice({
  name: 'time',
  initialState: {
    start_date: new Date(),
    end_date: new Date()
  },
  reducers: {
    setStart: (state, action) => {
      state.start_date = action.payload;
    },
    setEnd: (state, action) => {
      state.end_date = action.payload;
    }
  }
})


/*function startOutOfRange(start: Date){
    const now = new Date();
    if(start.getTime() > end.getTime() ||
        start.getTime() > now.getTime()){
        return false;
    }
    return true;
}

function endOutOfRange(end: Date){
    const now = new Date();
    if(end.getTime() < start.getTime() ||
        end.getTime() > now.getTime()){
        return false;
    }
    return true;
}
*/

export const { setStart, setEnd } = timeData.actions

export default timeData.reducer
