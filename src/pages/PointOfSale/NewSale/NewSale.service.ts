import { EDiscountTypes, ISaleData } from '@sellerspot/universal-types';
import { Dummies } from 'dummies/Dummies';

export class NewSaleService {
    static getInitialSaleDataState(): ISaleData {
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
                method: null,
                amountPaid: 0,
                balanceGiven: 0,
                grandTotal: 0,
                subTotal: 0,
                totalDiscount: 0,
                totalTax: 0,
            },
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
    }
}
