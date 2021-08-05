import { ICartTableProduct } from 'pages/PointOfSale/NewSale/components/CartTable/CartTable.types';
import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ICartState {
    productsData: ICartTableProduct[];
}

const initialState: ICartState = {
    productsData: [
        {
            quantity: 2,
            stockUnit: 'kg',
            productName: 'Tomatoes',
            unitPrice: 54,
            discountPercent: 0,
            taxBrackets: [
                {
                    bracketName: 'CGST',
                    bracketRate: 9,
                },
            ],
        },
        {
            quantity: 1,
            stockUnit: 'kg',
            productName: 'Potatoes',
            unitPrice: 32,
            discountPercent: 0,
            taxBrackets: [
                {
                    bracketName: 'CGST',
                    bracketRate: 9,
                },
            ],
        },
        {
            quantity: 1,
            stockUnit: 'pc',
            productName: 'Lays Crunchy Madness',
            unitPrice: 10,
            discountPercent: 0,
            taxBrackets: [
                {
                    bracketName: 'CGST',
                    bracketRate: 9,
                },
            ],
        },
    ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartProduct: (
            state,
            {
                payload,
            }: PayloadAction<{
                productData: ICartTableProduct;
                productIndex: number;
            }>,
        ) => {
            state.productsData[payload.productIndex] = payload.productData;
        },
        removeProductFromCart: (
            state,
            {
                payload,
            }: PayloadAction<{
                productIndex: number;
            }>,
        ) => {
            state.productsData.splice(payload.productIndex, 1);
        },
    },
});

// exporting reducer
export default cartSlice.reducer;

// exporting actions
export const { updateCartProduct, removeProductFromCart } = cartSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const cartSelector: Selector<RootState, ICartState> = (state: RootState) => state.cart;
