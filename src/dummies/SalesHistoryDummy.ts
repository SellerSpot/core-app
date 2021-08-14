import {
    EBILL_SIZES,
    EDiscountTypes,
    EPaymentMethods,
    ESaleStatus,
    ISaleData,
} from '@sellerspot/universal-types';

export default class SalesHistoryDummy {
    static getSalesData(): ISaleData[] {
        return [
            {
                id: 'YWw7c2RrZg==YWw7c2RrZg==YWw7c2RrZg==',
                customer: {
                    name: 'Developer',
                    reference: '123456789',
                },
                billSettings: {
                    size: EBILL_SIZES.BILL_A4,
                    remarkMessage: undefined,
                },
                taxSplitUps: [],
                user: {
                    name: 'Developer',
                    reference: '123456789',
                },
                status: ESaleStatus.COMPLETED,
                outlet: {
                    name: 'Default',
                    reference: '123456789',
                },
                createdAt: '2021-08-01T15:34:28.424Z',
                updatedAt: '2021-08-01T15:34:28.424Z',
                payment: {
                    method: EPaymentMethods.CASH,
                    totalDiscount: 0,
                    totalTax: 0,
                    subTotal: 10.0,
                    grandTotal: 10.0,
                    amountPaid: 10.0,
                    balanceGiven: 0,
                },
                saleDiscount: {
                    discount: 0,
                    discountType: EDiscountTypes.PERCENT,
                },
                cart: [
                    {
                        product: {
                            name: 'Product 1',
                            reference: '123456789',
                        },
                        quantity: 1,
                        productDiscount: {
                            discount: 0,
                            discountType: EDiscountTypes.PERCENT,
                        },
                        stockUnit: {
                            name: 'kg',
                            reference: '123456789',
                        },
                        sellingPrice: 10.0,
                        grandTotal: 10.0,
                        landingCost: 5.0,
                        mrp: 20,
                        totalDiscount: 0,
                        totalTax: 0,
                        taxBracket: {
                            name: 'Tax Bracket 1',
                            rate: 0,
                            reference: '123456789',
                        },
                    },
                ],
            },
        ];
    }
}
