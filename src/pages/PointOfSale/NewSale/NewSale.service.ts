import {
    EDiscountTypes,
    EPaymentMethods,
    ESaleStatus,
    ICartDetails,
    IInventoryData,
    ISaleData,
    ISaleTaxBracket,
    IStockUnitData,
    ITaxBracketData,
} from '@sellerspot/universal-types';
import { Dummies } from 'dummies/Dummies';
import { saleService } from 'services/services';
import { rawClone } from 'utilities/general';
import { showNotify } from '../../../../.yalc/@sellerspot/universal-components/dist';
import { newSaleState } from './NewSale';
import { INewSaleState } from './NewSale.types';

export class NewSaleService {
    static getNewSaleInitialState = (): INewSaleState => {
        return {
            modals: {
                checkout: true,
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
            cart: Dummies.salesHistory.getSalesData()[0].cart,
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

    static removeProductFromCart = (cartProductIndex: number): void => {
        const cart = newSaleState.saleData.cart;
        const cartData = rawClone<ICartDetails[]>(cart.get());
        cartData.splice(cartProductIndex, 1); // deletes the cart product
        newSaleState.saleData.cart.set(cartData);
    };

    static resetSale = (): void => {
        newSaleState.set(NewSaleService.getNewSaleInitialState());
    };

    static parkSaleInitater = (): void => {
        if (newSaleState.saleData.cart.get().length > 0) {
            newSaleState.batch((state) => {
                state.saleData.status.set(ESaleStatus.PARKED);
                state.modals.checkout.set(true);
            });
        } else {
            // throw some error stating that, the cart is empty
            showNotify('The cart is empty');
        }
    };

    static quoteSaleInitiator = (): void => {
        if (newSaleState.saleData.cart.get().length > 0) {
            newSaleState.batch((state) => {
                state.saleData.status.set(ESaleStatus.QUOTED);
                state.modals.checkout.set(true);
            });
        } else {
            // throw some error stating that, the cart is empty
            showNotify('The cart is empty');
        }
    };

    static checkoutSaleInitiator = (): void => {
        if (newSaleState.saleData.cart.get().length > 0) {
            newSaleState.batch((state) => {
                state.saleData.status.set(null); // null tells that the sale is not yet completed and yet to be checked out
                state.modals.checkout.set(true);
            });
        } else {
            // throw some error stating that, the cart is empty
            showNotify('The cart is empty');
        }
    };

    static computeSalePayment = (): void => {
        const { cart, payment } = rawClone<ISaleData>(newSaleState.saleData.get());

        const { productsDiscount, productsTotal, produtctsTax } = cart.reduce(
            (acc, curr) => {
                const { grandTotal, totalDiscount, totalTax } = saleService.computeProductTotals({
                    discount: curr.productDiscount,
                    quantity: curr.quantity,
                    taxBracket: curr.taxBracket,
                    unitPrice: curr.unitPrice,
                });
                acc.productsTotal += grandTotal;
                acc.produtctsTax += totalTax;
                acc.productsDiscount += totalDiscount;
                return acc;
            },
            { productsTotal: 0, productsDiscount: 0, produtctsTax: 0 },
        );

        // applying special discount (common discount) -> applied through checkout page on final bill
        // const totalDiscount =
        //     saleDiscount.discountType === EDiscountTypes.PERCENT
        //         ? (productsTotal * saleDiscount.discount) / 100
        //         : saleDiscount.discount;

        payment.grandTotal = productsTotal;
        payment.totalDiscount = productsDiscount;
        payment.totalTax = produtctsTax;

        newSaleState.saleData.payment.set(payment);
    };
}
