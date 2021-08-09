import { IBillData } from 'pages/PointOfSale/BillSettings/BillSettings.types';
import { IBillSettings } from '@sellerspot/universal-types';

export default class BillSettingsDummy {
    static getBillData(): IBillData {
        return {
            productCartInformation: [],
            totals: {
                grandTotal: 0,
                grandTotalDiscount: 0,
                grandTotalTax: 0,
                grandTotalTaxPercentage: 0,
            },
        };
    }
    static getBillSettings(): IBillSettings {
        return {
            defaultBill: 'BILL_A4',
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
                        data: 'This is a remark message',
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
                    footerMessage: {
                        show: true,
                        data: 'This is a footer message',
                    },
                },
            },
        };
    }
}
