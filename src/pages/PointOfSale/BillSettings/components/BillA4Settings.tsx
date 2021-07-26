import React, { ReactElement } from 'react';
import billSettingsStyle from '../BillSettings.module.scss';
import { CheckBox, InputField } from '@sellerspot/universal-components';

interface IBillA4Settings {
    storeDetails: {
        name: string;
        address: string;
        // outlet integration needs to be done here
    };
    GSTNumber: {
        show: boolean;
        value: string;
    };
    purchaseInvoiceSection: {
        show: boolean;
        discountColumn: boolean;
        taxColumn: boolean;
        MRPColumn: boolean;
    };
    purchaseSummarySection: {
        totalDiscount: boolean;
        youSaved: boolean;
    };
    taxSplitUpSection: {
        show: boolean;
    };
    remarkMessage: {
        show: boolean;
        value: string;
    };
    footerMessage: {
        show: boolean;
        value: string;
    };
    termsAndConditions: {
        show: boolean;
        value: string;
    };
    signature: {
        authorised: boolean;
        customer: boolean;
    };
}

export const BillA4Settings = (props: { state: IBillA4Settings }): ReactElement => {
    const {
        storeDetails,
        GSTNumber,
        purchaseInvoiceSection,
        purchaseSummarySection,
        taxSplitUpSection,
        remarkMessage,
        termsAndConditions,
        signature,
        footerMessage,
    } = props?.state ?? {
        storeDetails: { address: '', name: '' },
        GSTNumber: { show: false, value: '' },
        purchaseInvoiceSection: {
            show: false,
            discountColumn: false,
            taxColumn: false,
            MRPColumn: false,
        },
        purchaseSummarySection: { totalDiscount: false, youSaved: false },
        taxSplitUpSection: { show: false },
        remarkMessage: { show: false, value: '' },
        termsAndConditions: { show: false, value: '' },
        signature: { authorised: false, customer: false },
        footerMessage: { show: false, value: '' },
    };

    return (
        <>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Page Options</h5>
                <InputField
                    label="Store name"
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    value={storeDetails.name}
                />
                <InputField
                    label="Store address"
                    multiline={true}
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    rows={3}
                    value={storeDetails.address}
                />
                <CheckBox label={<h5>GST No</h5>} checked={GSTNumber.show} />
                {GSTNumber.show && (
                    <InputField
                        placeHolder="your GST No"
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        value={GSTNumber.value}
                    />
                )}
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Purchase invoice section</h5>
                <CheckBox label="Discount column" checked={purchaseInvoiceSection.discountColumn} />
                <CheckBox label="Tax column" checked={purchaseInvoiceSection.taxColumn} />
                <CheckBox label="MRP column" checked={purchaseInvoiceSection.MRPColumn} />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Purchase summary section</h5>
                <CheckBox label="Total discount" checked={purchaseSummarySection.totalDiscount} />
                <CheckBox label="You saved" checked={purchaseSummarySection.youSaved} />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox label={<h5>Tax split up section</h5>} checked={taxSplitUpSection.show} />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Special fields</h5>
                <CheckBox label="Thank you / Remark message" checked={remarkMessage.show} />
                {remarkMessage.show && (
                    <InputField
                        multiline={true}
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        placeHolder="Your thank you / remark message"
                        rows={3}
                        value={remarkMessage.value}
                    />
                )}
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox label={<h5>Terms and conditions</h5>} checked={termsAndConditions.show} />
                {termsAndConditions.show && (
                    <InputField
                        multiline={true}
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        placeHolder="Terms and conditions"
                        rows={3}
                        value={termsAndConditions.value}
                    />
                )}
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox label={<h5>Footer message</h5>} checked={footerMessage.show} />
                {footerMessage.show && (
                    <InputField
                        multiline={true}
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        placeHolder="Your footer message"
                        rows={3}
                        value={footerMessage.value}
                    />
                )}
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Signature</h5>
                <CheckBox label="Authorised signature" checked={signature.authorised} />
            </div>
        </>
    );
};
