import React, { ReactElement } from 'react';
import { State, useState } from '@hookstate/core';
import { CheckBox, InputField } from '@sellerspot/universal-components';
import { IBill90MMSettings } from '@sellerspot/universal-types';
import billSettingsStyle from '../BillSettings.module.scss';

export const Bill90MMSettings = (props: { state: State<IBill90MMSettings> }): ReactElement => {
    const { storeDetails, remarkMessage } = useState(props?.state);

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
            </div>
            <div className={billSettingsStyle.currentBillSettingsGroup}>
                <CheckBox
                    label={<h5>Footer message</h5>}
                    checked={remarkMessage.show.get()}
                    onChange={() => remarkMessage.show.set(!remarkMessage.show.get())}
                />
                {remarkMessage.show.get() && (
                    <InputField
                        multiline={true}
                        fullWidth
                        disableHelperTextPlaceholderPadding
                        placeHolder="Your footer message"
                        rows={3}
                        value={remarkMessage.data.get()}
                        onChange={(e) => remarkMessage.data.set(e.target.value)}
                    />
                )}
            </div>
        </>
    );
};
