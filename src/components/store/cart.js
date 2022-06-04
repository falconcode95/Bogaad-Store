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
            localStorage.setItem('previewProduct', state.previewProduct)
        },
        updateSimilar: (state,action) => {
            state.similarProducts = action.payload;
            localStorage.setItem('similarProducts', state.similarProducts)
        },
        updateCart: (state, action) => {
            const data = state.previewProduct;
            data.amount = 1;
            data.size = action.payload;
            state.cartProducts.push(data);
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        deleteCart: (state, action) => {
            state.cartProducts.splice(action.payload,1);
            localStorage.setItem('cartProducts', state.cartProducts);
        },
        incrimentAmount: (state, action) => {
            state.cartProducts[action.payload].amount += 1;
            localStorage.setItem('cartProducts', state.cartProducts);
        },
        decrimentAmount: (state, action) => {
            if(state.cartProducts[action.payload].amount > 1){
                state.cartProducts[action.payload].amount -= 1;
            }
            localStorage.setItem('cartProducts', state.cartProducts);
        },
        overideCart: (state, action) => {
            state.cartProducts = action.payload;
            localStorage.setItem('cartProducts', state.cartProducts);
        }
    }
})

export const  { changePreview, updateSimilar, updateCart, deleteCart, 
    incrimentAmount, decrimentAmount, overideCart } = cartSlice.actions;

export default cartSlice.reducer