import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    outlet_obj: {
        id: '',
        name: '',
        address: '',
        phoneNo: '',
    },
    outlet_list: [],
};

export const outletState = createSlice({
    name: 'outlet',
    initialState,
    reducers: {
        setIsLoadingOutlet: (state, action) => {
            state.isLoading = action.paylod;
        },
        setOutletObject: (state, action) => {
            state.outlet_obj = action.paylod;
        },
        setOutletList: (state, action) => {
            state.outlet_list = action.paylod;
        },
    },
});

export const {
    setIsLoadingOutlet,
    setOutletObject,
    setOutletList,
} = outletState.actions;

export default outletState.reducer;

