import {
    EDiscountTypes,
    EPaymentMethods,
    ESaleStatus,
    ISaleData,
} from '@sellerspot/universal-types';
import { introduceDelay } from '@sellerspot/universal-components';

export class SalesHistoryService {
    static fetchSalesHistory = async (): Promise<ISaleData[]> => {
        await introduceDelay(2000);
        return [
            {
                id: 'YWw7c2RrZg==YWw7c2RrZg==YWw7c2RrZg==',
                customer: {
                    name: 'Developer',
                    reference: '123456789',
                },
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
                        unitPrice: 10.0,
                        taxBracket: {
                            name: 'Tax Bracket 1',
                            rate: 0,
                            reference: '123456789',
                        },
                    },
                ],
            },
        ];
    };
}
