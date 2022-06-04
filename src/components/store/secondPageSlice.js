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
            localStorage.setItem('category', state.category)
        },
        filter: (state,action) => {
            state.filterBy = action.payload;
            localStorage.setItem('filterBy', state.filterBy)
        },
        toggleFooterIntersection: (state, action) => {
            state.footerIntersecting = action.payload; 
        },
        toggleNBackground : (state, action) => {
            state.toggleNavBackground = action.payload;
            localStorage.setItem('toggleNavBackground', state.toggleNavBackground)
        },
        changeActivePage: (state, action) => {
            state.activePage = action.payload;
            localStorage.setItem('activePage', action.payload);
        }
    }
})

export const toggleNavBG = (e)=> {
    const element = e.target.innerText;
    return element
  }

export const  { change, filter, toggleFooterIntersection, toggleNBackground, changeActivePage } = shopSlice.actions;

export default shopSlice.reducer