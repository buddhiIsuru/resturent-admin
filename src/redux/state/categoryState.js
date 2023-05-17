import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    cat_obj: {},
    // cat_obj: {
    //     id: '',
    //     name: '',
    //     outletId: '',
    // },
    category_list: [],
};

export const categoryState = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.paylod;
        },
        setCategoryObject: (state, action) => {
            state.cat_obj = action.paylod;
        },
        setCategoryList: (state, action) => {
            state.category_list = action.paylod;
        },
    },
});

export const {
    setIsLoading,
    setCategoryObject,
    setCategoryList,
} = categoryState.actions;

export default categoryState.reducer;

