import { createSlice } from '@reduxjs/toolkit';





export const dataSlice = createSlice({
  name: 'data',
  initialState:{
    ip:"" 
  },

  reducers: {
    addIp: (state, action) => {
      state.ip = action.payload
    },

   

  }

 
});


export const { addIp } = dataSlice.actions;

export default dataSlice.reducer;