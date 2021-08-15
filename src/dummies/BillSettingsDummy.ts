import { EBILL_SIZES, IBillSettings } from '@sellerspot/universal-types';

export default class BillSettingsDummy {
    static getBillSettings(): IBillSettings {
        return {
            defaultBill: EBILL_SIZES.BILL_90MM,
            bills: {
                BILL_A4: {
                    storeDetails: {
                        name: 'Developer Store',
                        address: 'No 69, Develper Store,\nChennai\n621211\n8489455901',
                    },
                    GSTNumber: {
                        show: true,
                        data: '1234235234234',
                    },
                    footerMessage: {
                        show: true,
                        data: 'This is a footer message',
                    },
                    taxInvoiceSection: {
                        show: true,
                        GSTNumber: true,
                        billingAddress: true,
                        shippingAddress: true,
                    },
                    purchaseInvoiceSection: {
                        show: true,
                        MRPColumn: true,
                        discountColumn: true,
                        taxColumn: true,
                    },
                    purchaseSummarySection: {
                        totalDiscount: true,
                        youSaved: true,
                    },
                    taxSplitUpSection: {
                        show: true,
                    },
                    remarkMessage: {
                        show: true,
                        data: 'No refund / exchange for all products',
                    },
                    termsAndConditions: {
                        show: true,
                        data: '1. This is a terms and conditions\n2. It can be a list',
                    },
                    signature: {
                        authorised: true,
                        customer: true,
                    },
                },
                BILL_90MM: {
                    storeDetails: {
                        name: 'Developer Store',
                        address: 'No 69, Develper Store,\nChennai\n621211\n8489455901',
                    },
                    remarkMessage: {
                        show: true,
                        data: 'This is a footer message',
                    },
                },
            },
        };
    }
}
