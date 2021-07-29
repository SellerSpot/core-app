import React, { ReactElement } from 'react';
import billSettingsStyle from '../BillSettings.module.scss';
import { CheckBox, InputField } from '@sellerspot/universal-components';
import { IBillA4Settings } from '../BillSettings.types';
import { State, useState } from '@hookstate/core';

export const BillA4Settings = (props: { state: State<IBillA4Settings> }): ReactElement => {
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
    } = useState(props?.state);

    return (
        <>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Page Options</h5>
                <InputField
                    label="Store name"
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    value={storeDetails.name.get()}
                    onChange={(e) => storeDetails.name.set(e.target.value)}
                />
                <InputField
                    label="Store address"
                    multiline={true}
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    rows={3}
                    value={storeDetails.address.get()}
                    onChange={(e) => storeDetails.address.set(e.target.value)}
                />
                <CheckBox
                    label={<h5>GST No</h5>}
                    checked={GSTNumber.show.get()}
                    onChange={() => GSTNumber.show.set(!GSTNumber.show.get())}
                />
                {GSTNumber.show.get() && (
                    <InputField
                        placeHolder="your GST No"
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        value={GSTNumber.data.get()}
                    />
                )}
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Purchase invoice section</h5>
                <CheckBox
                    label="Discount column"
                    checked={purchaseInvoiceSection.discountColumn.get()}
                    onChange={() =>
                        purchaseInvoiceSection.discountColumn.set(
                            !purchaseInvoiceSection.discountColumn.get(),
                        )
                    }
                />
                <CheckBox
                    label="Tax column"
                    checked={purchaseInvoiceSection.taxColumn.get()}
                    onChange={() =>
                        purchaseInvoiceSection.taxColumn.set(
                            !purchaseInvoiceSection.taxColumn.get(),
                        )
                    }
                />
                <CheckBox
                    label="MRP column"
                    checked={purchaseInvoiceSection.MRPColumn.get()}
                    onChange={() =>
                        purchaseInvoiceSection.MRPColumn.set(
                            !purchaseInvoiceSection.MRPColumn.get(),
                        )
                    }
                />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Purchase summary section</h5>
                <CheckBox
                    label="Total discount"
                    checked={purchaseSummarySection.totalDiscount.get()}
                    onChange={() =>
                        purchaseSummarySection.totalDiscount.set(
                            !purchaseSummarySection.totalDiscount.get(),
                        )
                    }
                />
                <CheckBox
                    label="You saved"
                    checked={purchaseSummarySection.youSaved.get()}
                    onChange={() =>
                        purchaseSummarySection.youSaved.set(!purchaseSummarySection.youSaved.get())
                    }
                />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox
                    label={<h5>Tax split up section</h5>}
                    checked={taxSplitUpSection.show.get()}
                    onChange={() => taxSplitUpSection.show.set(!taxSplitUpSection.show.get())}
                />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Special fields</h5>
                <CheckBox
                    label="Thank you / Remark message"
                    checked={remarkMessage.show.get()}
                    onChange={() => remarkMessage.show.set(!remarkMessage.show.get())}
                />
                {remarkMessage.show.get() && (
                    <InputField
                        multiline={true}
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        placeHolder="Your thank you / remark message"
                        rows={3}
                        value={remarkMessage.data.get()}
                        onChange={(e) => remarkMessage.data.set(e.target.value)}
                    />
                )}
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox
                    label={<h5>Terms and conditions</h5>}
                    checked={termsAndConditions.show.get()}
                    onChange={() => termsAndConditions.show.set(!termsAndConditions.show.get())}
                />
                {termsAndConditions.show.get() && (
                    <InputField
                        multiline={true}
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        placeHolder="Terms and conditions"
                        rows={3}
                        value={termsAndConditions.data.get()}
                        onChange={(e) => termsAndConditions.data.set(e.target.value)}
                    />
                )}
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox
                    label={<h5>Footer message</h5>}
                    checked={footerMessage.show.get()}
                    onChange={() => footerMessage.show.set(!footerMessage.show.get())}
                />
                {footerMessage.show.get() && (
                    <InputField
                        multiline={true}
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        placeHolder="Your footer message"
                        rows={3}
                        value={footerMessage.data.get()}
                        onChange={(e) => footerMessage.data.set(e.target.value)}
                    />
                )}
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Signature</h5>
                <CheckBox
                    label="Authorised signature"
                    checked={signature.authorised.get()}
                    onChange={() => signature.authorised.set(!signature.authorised.get())}
                />
            </div>
        </>
    );
};
