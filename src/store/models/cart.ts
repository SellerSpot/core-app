import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { ICartProductsData } from 'components/Compounds/CartTable/CartTable.types';
import { RootState } from '../store';

interface ICartState {
    productsData: ICartProductsData[];
}

const initialState: ICartState = {
    productsData: [
        {
            qty: 12,
            productName: 'Tomatoes 1KG',
            subTotal: 200,
        },
        {
            qty: 2,
            productName: 'Potatoes 1KG',
            subTotal: 452,
        },
    ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        modifyCartProductQuantity: (
            state,
            {
                payload,
            }: PayloadAction<{
                productQuantity: ICartProductsData['qty'];
                productIndex: number;
            }>,
        ) => {
            state.productsData[payload.productIndex].qty = payload.productQuantity;
        },
        modifyCartProductPrice: (
            state,
            {
                payload,
            }: PayloadAction<{
                productQuantity: ICartProductsData['qty'];
                productIndex: number;
            }>,
        ) => {
            state.productsData[payload.productIndex].qty = payload.productQuantity;
        },
    },
});

// exporting reducer
export default cartSlice.reducer;

// exporting actions
export const { modifyCartProductQuantity, modifyCartProductPrice } = cartSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const cartSelector: Selector<RootState, ICartState> = (state: RootState) => state.cart;
