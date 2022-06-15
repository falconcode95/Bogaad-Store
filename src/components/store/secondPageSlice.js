import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 'All',
    filterBy: 2,
    footerIntersecting: false,
    toggleNavBackground: false,
    activePage: '',
    aboutUsActive: false
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers : {
        change: (state, action) => {
            state.category = action.payload;
        },
        filter: (state,action) => {
            state.filterBy = action.payload;
        },
        toggleFooterIntersection: (state, action) => {
            state.footerIntersecting = action.payload; 
        },
        changeActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        changeAboutUsActive: (state, action) => {
            state.aboutUsActive = action.payload;
        }
    }
})

export const  { change, filter, toggleFooterIntersection, changeActivePage, changeAboutUsActive } = shopSlice.actions;

export default shopSlice.reducer