import React, { ReactElement } from 'react';
import billSettingsStyle from '../BillSettings.module.scss';
import { CheckBox, InputField } from '@sellerspot/universal-components';

export const BillA4Settings = (): ReactElement => {
    return (
        <>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Page Options</h5>
                <InputField label="Store name" fullWidth disableHelperTextPlaceholderPadding />
                <InputField
                    label="Store address"
                    multiline={true}
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    rows={3}
                />
                <CheckBox label="GST No" />
                <InputField label="GST No" fullWidth disableHelperTextPlaceholderPadding />
                <CheckBox label="Tax split up section" />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Purchase invoice options</h5>
                <CheckBox label="Discount column" />
                <CheckBox label="Tax column" />
                <CheckBox label="MRP column" />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Purchase summary options</h5>
                <CheckBox label="Total discount" />
                <CheckBox label="You saved" />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Special fields</h5>
                <CheckBox label="Thank you / Remark message" />
                <InputField
                    multiline={true}
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    placeHolder="Your thank you / remark message"
                    rows={3}
                />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox label={<h5>Terms and conditions</h5>} />
                <InputField
                    multiline={true}
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    placeHolder="Terms and conditions"
                    rows={3}
                />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox label={<h5>Footer message</h5>} />
                <InputField
                    multiline={true}
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    placeHolder="Your footer message"
                    rows={3}
                />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox label={<h5>Signature</h5>} />
                <CheckBox label="Authorised signature" />
            </div>
        </>
    );
};
