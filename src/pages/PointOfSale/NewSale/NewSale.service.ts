import { State } from '@hookstate/core';
import {
    EDiscountTypes,
    EPaymentMethods,
    ICartDetails,
    IInventoryData,
    ISaleData,
    ISaleTaxBracket,
    IStockUnitData,
    ITaxBracketData,
} from '@sellerspot/universal-types';
import { rawClone } from 'utilities/general';
import { newSaleState } from './NewSale';
import { INewSaleState } from './NewSale.types';

export class NewSaleService {
    static getNewSaleInitialState = (): INewSaleState => {
        return {
            modals: {
                checkout: false,
                parkedSales: false,
            },
            saleData: NewSaleService.getInitialSaleDataState(),
            search: {
                query: '',
                results: [],
                searching: false,
            },
        };
    };

    static getInitialSaleDataState = (): ISaleData => {
        return {
            cart: [],
            customer: {
                name: null,
                reference: null,
            },
            outlet: {
                name: null,
                reference: null,
            },
            payment: {
                method: EPaymentMethods.CASH,
                amountPaid: 0,
                balanceGiven: 0,
                grandTotal: 0,
                subTotal: 0,
                totalDiscount: 0,
                totalTax: 0,
            },
            // special discount - overall discount
            saleDiscount: {
                discountType: EDiscountTypes.PERCENT,
                discount: 0,
            },
            status: null,
            user: {
                name: null,
                reference: null,
            },
        };
    };

    static addProductToCart = (productToBeAdded: IInventoryData, outletId: string): void => {
        const saleData = newSaleState.saleData;
        const cartData = rawClone<ICartDetails[]>(saleData.cart.get());
        const productIndex = cartData.findIndex(
            (product) => productToBeAdded.id === product.product.reference,
        );
        // if productIndex found increase the quantity by 1 else add an new product entry in the cart
        if (productIndex > -1) {
            cartData[productIndex].quantity += 1;
        } else {
            const currentOutlet = productToBeAdded.outlets[outletId];
            const currentTaxBracket = <ITaxBracketData>currentOutlet.taxBracket;
            const currentStockUnit = <IStockUnitData>productToBeAdded.stockUnit;
            const newCartProduct: ICartDetails = {
                product: {
                    name: productToBeAdded.name,
                    reference: productToBeAdded.id,
                },
                quantity: 1,
                unitPrice: currentOutlet.sellingPrice,
                productDiscount: {
                    discount: 0,
                    discountType: EDiscountTypes.PERCENT,
                },
                stockUnit: {
                    name: currentStockUnit.unit,
                    reference: currentStockUnit.id,
                },
                taxBracket: {
                    name: currentTaxBracket.name,
                    rate: currentTaxBracket.rate,
                    reference: currentTaxBracket.id,
                    group: (<Omit<ITaxBracketData, 'group'>[]>currentTaxBracket.group)?.reduce(
                        (acc, curr) => {
                            acc.push({
                                name: curr.name,
                                rate: curr.rate,
                                reference: curr.id,
                            });
                            return acc;
                        },
                        <Omit<ISaleTaxBracket, 'group'>[]>[],
                    ),
                },
            };
            cartData.push(newCartProduct);
        }
        saleData.cart.set(cartData);
    };

    static removeProductFromCart = (
        cartProductIndex: number,
        cart: State<ICartDetails[]>,
    ): void => {
        const cartData = rawClone<ICartDetails[]>(cart.get());
        cartData.splice(cartProductIndex, 1); // deletes the cart product
        cart.set(cartData);
    };

    static resetSale = (): void => {
        newSaleState.set(NewSaleService.getNewSaleInitialState());
    };
}
