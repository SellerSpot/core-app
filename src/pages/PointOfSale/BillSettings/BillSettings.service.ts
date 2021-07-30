import { introduceDelay } from '@sellerspot/universal-components';
import { IBillData, IBillSettings, TBillDimensions } from './BillSettings.types';

export class BillSettingsService {
    static billDimentsions: TBillDimensions = {
        BILL_A4: { width: 793 },
        BILL_90MM: { width: 340 },
    };

    static dummyBillData: IBillData = {
        productCartInformation: [],
        totals: {
            grandTotal: 0,
            grandTotalDiscount: 0,
            grandTotalTax: 0,
            grandTotalTaxPercentage: 0,
        },
    };

    static fetchBillSettings = async (): Promise<IBillSettings> => {
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
    };

    static updateBillSettings = async (billSettings: IBillSettings): Promise<IBillSettings> => {
        await introduceDelay(2000);
        return billSettings;
    };
}
