import React, { ReactElement } from 'react';
import billSettingsStyle from '../BillSettings.module.scss';
import { CheckBox, InputField } from '@sellerspot/universal-components';

export const BillA4Settings = (): ReactElement => {
    return (
        <>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Page Options</h5>
                <InputField
                    placeHolder="Store name"
                    fullWidth
                    disableHelperTextPlaceholderPadding
                />
                <CheckBox label="Tax invoice" />
                <CheckBox label="Tax split up" />
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
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Footer options</h5>
                <CheckBox label="Footer message" />
                <InputField
                    multiline={true}
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    placeHolder="Your footer message"
                    rows={3}
                />
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
        </>
    );
};
