import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signedIn: false,
    user: {
        email: '',
        name: '',
        surname: ''
    },
    wishList: []
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers : {
        changeSignedInState: (state, action)=> {
            localStorage.setItem('signedIn', action.payload)
            state.signedIn = action.payload;
        },
        updateUser: (state,action)=> {
            // console.log(action.payload + 'message recieved' + state.signedIn)
            state.user = {
                email: action.payload.email,
                name: action.payload.name,
                surname: action.payload.surname
            }
            localStorage.setItem('user', state.user)
        },
        updateSomeUser: (state,action)=> {
            const key = action.payload[0]
            state.user[key] = action.payload[1];
            localStorage.setItem('user', state.user)
        },
        addToWishList: (state, action)=> {
            if(!state.wishList.some(item => item.id === action.payload.id && item.name === action.payload.name)){ 
            state.wishList.push(action.payload);
           }
           localStorage.setItem('wishlist', state.wishList);
        },
        removeFromWishList: (state, action)=> {
            state.wishList = state.wishList.filter( item => item.type !== action.payload);
            localStorage.setItem('wishlist', state.wishList);
        },
        overideWishList: (state, action) => {
            console.log('inside wish redux')
            state.wishList = action.payload;
            localStorage.setItem('wishlist', state.wishList);
        }
    }
})

export const  { changeSignedInState, updateUser, updateSomeUser, addToWishList, 
removeFromWishList, overideWishList } = accountSlice.actions;

export default accountSlice.reducer