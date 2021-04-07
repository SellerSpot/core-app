import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { ICartProductsData } from 'components/Compounds/CartTable/CartTable.types';
import { RootState } from '../store';

interface ICartState {
    productsData: ICartProductsData[];
}

const initialState: ICartState = {
    productsData: [
        {
            quantity: 2,
            stockUnit: 'kg',
            productName: 'Tomatoes',
            unitPrice: 54,
            subTotal: 0,
        },
        {
            quantity: 1,
            stockUnit: 'kg',
            productName: 'Potatoes',
            unitPrice: 32,
            subTotal: 0,
        },
        {
            quantity: 1,
            stockUnit: 'pc',
            productName: 'Lays Crunchy Madness',
            unitPrice: 10,
            subTotal: 0,
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
                quantity: ICartProductsData['quantity'];
                productIndex: number;
            }>,
        ) => {
            state.productsData[payload.productIndex].quantity = payload.quantity;
        },
        modifyCartProductUnitPrice: (
            state,
            {
                payload,
            }: PayloadAction<{
                unitPrice: ICartProductsData['unitPrice'];
                productIndex: number;
            }>,
        ) => {
            state.productsData[payload.productIndex].unitPrice = payload.unitPrice;
        },
    },
});

// exporting reducer
export default cartSlice.reducer;

// exporting actions
export const { modifyCartProductQuantity, modifyCartProductUnitPrice } = cartSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const cartSelector: Selector<RootState, ICartState> = (state: RootState) => state.cart;
