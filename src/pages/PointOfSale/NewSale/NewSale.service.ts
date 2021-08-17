import {
    EBILL_SIZES,
    EDiscountTypes,
    EPaymentMethods,
    ESaleStatus,
    ICartDetails,
    IInventoryData,
    ISaleData,
    ISaleTaxBracket,
    IStockUnitData,
    ITaxBracketData,
    ITaxSplitUp,
} from '@sellerspot/universal-types';
import { Dummies } from 'dummies/Dummies';
import { requests } from 'requests/requests';
import { saleService } from 'services/services';
import { rawClone } from 'utilities/general';
import { showNotify } from '../../../../.yalc/@sellerspot/universal-components/dist';
import { ICartTableFormValues } from './components/NewSaleCartSection/components/CartTable/CartTable.types';
import { newSaleState } from './NewSale';
import { INewSaleModals, INewSaleState, ISearchState } from './NewSale.types';

export class NewSaleService {
    static getModalsInitialState(): INewSaleModals {
        return {
            checkout: false,
            parkedSales: false,
        };
    }

    static getSearchInitialState(): ISearchState {
        return {
            query: '',
            results: [],
            searching: false,
        };
    }

    static getNewSaleInitialState = (): INewSaleState => {
        return {
            modals: NewSaleService.getModalsInitialState(),
            saleData: NewSaleService.getInitialSaleDataState(),
            search: NewSaleService.getSearchInitialState(),
            billSettings: Dummies.billSettings.getBillSettings(),
        };
    };

    static getCustomerInitialState = (): ISaleData['customer'] => {
        return {
            isAnonymous: false,
            name: '',
            billingAddress: '',
            email: '',
            mobile: '',
            shippingAddress: '',
            reference: '',
        };
    };

    static getInitialSaleDataState = (): ISaleData => {
        return {
            cart: [],
            billSettings: {
                size: EBILL_SIZES.BILL_A4,
                remarkMessage: '',
            },
            customer: NewSaleService.getCustomerInitialState(),
            outlet: {
                name: null,
                reference: null,
            },
            taxSplitUps: [],
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

    static resetDynamicStateData = (): void => {
        newSaleState.batch((state) => {
            state.modals.set(NewSaleService.getModalsInitialState());
            state.search.set(NewSaleService.getSearchInitialState());
            state.saleData.set(NewSaleService.getInitialSaleDataState());
            // billSettings don't need to clear the billSettings State,
            // as it will cause the  billsetting to be fetched again from the server
        });
    };

    static addProductToCart = (productToBeAdded: IInventoryData, outletId: string): void => {
        const saleData = newSaleState.saleData;
        const cartData = rawClone<ICartDetails[]>(saleData.cart.get());
        const cartItemIndex = cartData.findIndex(
            (product) => productToBeAdded.id === product.product.reference,
        );
        // if cartItemIndex found increase the quantity by 1 else add an new product entry in the cart
        if (cartItemIndex > -1) {
            const currentCartItem = cartData[cartItemIndex];
            currentCartItem.quantity += 1;
        } else {
            const currentOutlet = productToBeAdded.outlets[outletId];
            const currentTaxBracket = <ITaxBracketData>currentOutlet.taxBracket;
            const currentStockUnit = <IStockUnitData>productToBeAdded.stockUnit;
            const newCartItem: ICartDetails = {
                product: {
                    name: productToBeAdded.name,
                    reference: productToBeAdded.id,
                },
                quantity: 1,
                sellingPrice: currentOutlet.sellingPrice,
                grandTotal: currentOutlet.sellingPrice,
                landingCost: currentOutlet.landingCost,
                mrp: currentOutlet.mrp,
                totalDiscount: 0, // computable values will be computed atlast using computeAndSetProductTotals function
                totalTax: 0,
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
            cartData.push(newCartItem);
        }
        saleData.cart.set(cartData);
        NewSaleService.computeSalePayment(); // asynchronusly compute totals
    };

    /**
     * this function will mutate the passed in cartItem and set the required totals
     */
    static computeAndSetProductTotals = (
        cartItem: ICartDetails,
        returnCartItem?: boolean,
    ): void | ICartDetails => {
        const { grandTotal, totalDiscount, totalTax } = saleService.computeProductTotals({
            discount: cartItem.productDiscount,
            quantity: cartItem.quantity,
            sellingPrice: cartItem.sellingPrice,
            taxBracket: cartItem.taxBracket,
        });

        cartItem.grandTotal = grandTotal;
        cartItem.totalTax = totalTax;
        cartItem.totalDiscount = totalDiscount;
        if (returnCartItem) return cartItem;
    };

    static removeProductFromCart = (cartProductIndex: number): void => {
        const cart = newSaleState.saleData.cart;
        const cartData = rawClone<ICartDetails[]>(cart.get());
        cartData.splice(cartProductIndex, 1); // deletes the cart product
        newSaleState.saleData.cart.set(cartData);
        NewSaleService.computeSalePayment(); // asynchronusly compute totals
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

    static computeSalePayment = async (): Promise<void> => {
        const { cart, payment } = rawClone<ISaleData>(newSaleState.saleData.get());

        const { productsDiscount, productsTotal, produtctsTax } = cart.reduce(
            (accumlator, currrentCartItem) => {
                const { grandTotal, totalDiscount, totalTax } =
                    NewSaleService.computeAndSetProductTotals(
                        currrentCartItem,
                        true,
                    ) as ICartDetails;

                accumlator.productsTotal += grandTotal;
                accumlator.produtctsTax += totalTax;
                accumlator.productsDiscount += totalDiscount;

                return accumlator;
            },
            { productsTotal: 0, productsDiscount: 0, produtctsTax: 0 },
        );

        payment.grandTotal = productsTotal;
        payment.totalDiscount = productsDiscount;
        payment.totalTax = produtctsTax;

        newSaleState.saleData.batch((state) => {
            state.payment.set(payment);
            state.cart.set(cart);
            state.taxSplitUps.set(NewSaleService.getTaxSplitups(cart));
        });
    };

    static getTaxSplitups = (cart: ICartDetails[]): ITaxSplitUp[] => {
        const taxSplitUps = new Map<string, ITaxSplitUp>();

        cart.forEach(({ taxBracket, quantity, productDiscount, sellingPrice }, key) => {
            if (taxBracket.group) {
                const taxGroup: ISaleTaxBracket[] = taxBracket.group;
                taxGroup.forEach((currentTaxBracket) => {
                    const { taxableAmount, totalTax } = saleService.computeProductTotals({
                        discount: productDiscount,
                        quantity,
                        taxBracket: currentTaxBracket,
                        sellingPrice,
                    });
                    const taxSplitUp = taxSplitUps.get(currentTaxBracket.name);
                    if (!taxSplitUp) {
                        taxSplitUps.set(currentTaxBracket.name, {
                            name: currentTaxBracket.name,
                            rate: currentTaxBracket.rate,
                            taxableValue: taxableAmount,
                            taxAmount: totalTax,
                            cartItemsSerialNumber: [key + 1],
                        });
                    } else {
                        taxSplitUp.taxAmount += taxableAmount;
                        taxSplitUp.cartItemsSerialNumber.push(key + 1);
                    }
                });
            } else {
                const { taxableAmount, totalTax } = saleService.computeProductTotals({
                    discount: productDiscount,
                    quantity,
                    taxBracket,
                    sellingPrice,
                });
                const taxSplitUp = taxSplitUps.get(taxBracket.name);
                if (!taxSplitUp) {
                    taxSplitUps.set(taxBracket.name, {
                        name: taxBracket.name,
                        rate: taxBracket.rate,
                        taxableValue: taxableAmount,
                        taxAmount: totalTax,
                        cartItemsSerialNumber: [key + 1],
                    });
                } else {
                    taxSplitUp.taxAmount += taxableAmount;
                    taxSplitUp.cartItemsSerialNumber.push(key + 1);
                }
            }
        });

        return [...taxSplitUps.values()];
    };

    static handleOnCartItemValueChange = (
        cartItemIndex: number,
        values: ICartTableFormValues,
    ): void => {
        const cart = rawClone<ICartDetails[]>(newSaleState.saleData.cart.get());
        const currentCartItem = cart[cartItemIndex];

        // updating the product
        currentCartItem.product.name = values.productName;
        currentCartItem.productDiscount = {
            discount: +values.discountPercent,
            discountType: EDiscountTypes.PERCENT,
        };
        currentCartItem.quantity = +values.quantity;
        currentCartItem.sellingPrice = +values.unitPrice;
        newSaleState.saleData.cart.set(cart);
        NewSaleService.computeSalePayment(); // asynchronusly compute totals
    };

    static completeCheckout = async (): Promise<boolean> => {
        const saleData = rawClone<ISaleData>(newSaleState.saleData.get());
        // change the status of the sale
        saleData.status = ESaleStatus.COMPLETED;
        // once get success response from the server return back the saleData response,
        // where we will get the invoice number and date,
        // then trigger the print invoice flow if user clicks the print bill

        const { data, status, error } = await requests.pos.salesRequest.createNewSale(saleData);
        if (status) {
            newSaleState.batch((state) => {
                state.saleData.set(data);
            });
            return true;
        } else {
            throw error;
        }
    };

    static completeParkSale = async (): Promise<boolean> => {
        const saleData = rawClone<ISaleData>(newSaleState.saleData.get());
        // change the status of the sale
        saleData.status = ESaleStatus.PARKED;

        // once get success response from the server return back the saleData response,
        // where we will get the invoice number and date,
        // then trigger the print invoice flow if user clicks the print bill

        const { status, error } = await requests.pos.salesRequest.parkSale(saleData);
        if (status) {
            return true;
        } else {
            throw error;
        }
    };

    static retrieveSale = async (retrievedSaleData: ISaleData): Promise<void> => {
        const saleId = retrievedSaleData.id;
        // change the status of the retrieved sale to denote that the sale is not completed yet
        retrievedSaleData.status = null;
        retrievedSaleData.id = null;
        newSaleState.batch((state) => {
            state.saleData.set(retrievedSaleData);
            state.search.set(NewSaleService.getSearchInitialState());
            state.modals.set(NewSaleService.getModalsInitialState());
        });

        // tell the server that we are retrieving the sale - server will remove the sale from the database
        requests.pos.salesRequest.retrieveSale(saleId); // no need to catch the response, it can be run on background
    };

    static deleteParkedSale = async (parkedSaleId: string): Promise<void> => {
        // tell the server that we are removing a parked sale - server will remove the sale from the database
        requests.pos.salesRequest.deleteParkedSale(parkedSaleId); // no need to catch the response, it can be run on background
    };
}
