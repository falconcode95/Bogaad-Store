import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signedIn: false,
    user: {
        email: '',
        name: '',
        surname: ''
    },
    wishList: [],
    activeLink: '',
    activeSection: 'account'
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers : {
        changeSignedInState: (state, action)=> {
            state.signedIn = action.payload;
        },
        updateUser: (state,action)=> {
            state.user = {
                email: action.payload.email,
                name: action.payload.name,
                surname: action.payload.surname
            }
        },
        updateSomeUser: (state,action)=> {
            const key = action.payload[0]
            state.user[key] = action.payload[1];
        },
        addToWishList: (state, action)=> {
            if(!state.wishList.some(item => item.id === action.payload.id && item.name === action.payload.name)){ 
            state.wishList.push(action.payload);
           }
        },
        removeFromWishList: (state, action)=> {
            state.wishList = state.wishList.filter( item => item.type !== action.payload);
        },
        overideWishList: (state, action) => {
            state.wishList = action.payload;
        },
        changeActiveLink: (state, action) => {
            state.activeLink = action.payload;
        },
        changeActiveSection: (state, action)=> {
            state.activeSection = action.payload;
        }
    }
})

export const  { changeSignedInState, updateUser, updateSomeUser, addToWishList, 
removeFromWishList, overideWishList, changeActiveLink, changeActiveSection } = accountSlice.actions;

export default accountSlice.reducer