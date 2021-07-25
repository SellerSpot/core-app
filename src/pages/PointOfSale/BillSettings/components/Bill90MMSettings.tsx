import React, { ReactElement } from 'react';
import billSettingsStyle from '../BillSettings.module.scss';
import { CheckBox, InputField } from '@sellerspot/universal-components';

export const Bill90MMSettings = (): ReactElement => {
    return (
        <>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Page Options</h5>
                <InputField
                    placeHolder="Store name"
                    fullWidth
                    disableHelperTextPlaceholderPadding
                />
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <h5>Header options</h5>
                <InputField
                    multiline={true}
                    fullWidth
                    disableHelperTextPlaceholderPadding
                    placeHolder="Your header message"
                    rows={3}
                />
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
        </>
    );
};
