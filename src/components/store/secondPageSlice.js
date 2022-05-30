import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 'All',
    filterBy: 2,
    footerIntersecting: false,
    toggleNavBackground: false,
    activePage: ''
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
        toggleNBackground : (state, action) => {
            state.toggleNavBackground = action.payload;
        },
        changeActivePage: (state, action) => {
            state.activePage = action.payload
        }
    }
})

export const toggleNavBG = (e)=> {
    const element = e.target.innerText;
    return element
  }

export const  { change, filter, toggleFooterIntersection, toggleNBackground, changeActivePage } = shopSlice.actions;

export default shopSlice.reducer