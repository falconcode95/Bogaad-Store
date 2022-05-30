import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    previewProduct: {
        id: '',
        name: '',
        type: '',
        subType: '',
        price: ''
    }, 
    similarProducts: [],
    cartProducts: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        changePreview: (state, action) => {
            state.previewProduct = {
                id: action.payload[0],
                name: action.payload[1],
                type: action.payload[2],
                subType: action.payload[3],
                price: action.payload[4]
            }
        },
        updateSimilar: (state,action) => {
            state.similarProducts = action.payload
        },
        updateCart: (state, action) => {
            const data = state.previewProduct;
            data.amount = 1;
            data.size = action.payload;
            state.cartProducts.push(data);
        },
        deleteCart: (state, action) => {
            state.cartProducts.splice(action.payload,1);
        },
        incrimentAmount: (state, action) => {
            state.cartProducts[action.payload].amount += 1;
        },
        decrimentAmount: (state, action) => {
            if(state.cartProducts[action.payload].amount > 1){
                state.cartProducts[action.payload].amount -= 1;
            }
        }
    }
})

export const  { changePreview, updateSimilar, updateCart, deleteCart, incrimentAmount, decrimentAmount } = cartSlice.actions;

export default cartSlice.reducer