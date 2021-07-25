import React, { ReactElement } from 'react';
import billSettingsStyle from '../BillSettings.module.scss';
import { CheckBox, InputField } from '@sellerspot/universal-components';

export const Bill90MMSettings = (): ReactElement => {
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
        </>
    );
};
