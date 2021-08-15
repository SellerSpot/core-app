import React, { ReactElement } from 'react';
import {
    IInputFieldProps,
    InputField,
    ISelectOption,
    Select,
} from '@sellerspot/universal-components';
import styles from '../CheckoutSliderModal.module.scss';
import { BillSettingsService } from 'pages/PointOfSale/BillSettings/BillSettings.service';
import { useState } from '@hookstate/core';
import { newSaleState } from 'pages/PointOfSale/NewSale/NewSale';
import { EBILL_SIZES } from '@sellerspot/universal-types';

export const CheckoutBillSettingsGroup = (): ReactElement => {
    // state
    const saleData = useState(newSaleState.saleData);

    // handlers
    const onBillTypeChangeHandler = (option: ISelectOption<EBILL_SIZES>) => {
        saleData.billSettings.size.set(option.meta);
    };

    const onBillSettingsRemarkMessageChangeHandler: IInputFieldProps['onChange'] = (event) => {
        saleData.billSettings.remarkMessage.set(event.target.value);
    };

    // draw
    return (
        <div className={styles.settingsGroup}>
            <h4>Bill settings</h4>
            <Select
                label="Bill Size"
                options={BillSettingsService.billOptions}
                value={BillSettingsService.billOptions.find(
                    (billOption) => billOption.meta === saleData.billSettings.size.get(),
                )}
                onChange={onBillTypeChangeHandler}
                isClearable={false}
            />
            <InputField
                type="text"
                label="Remark message"
                placeHolder={'Remark message / thank you'}
                multiline
                rows={2}
                theme="primary"
                disableHelperTextPlaceholderPadding
                fullWidth
                value={saleData.billSettings.remarkMessage.get()}
                onChange={onBillSettingsRemarkMessageChangeHandler}
            />
        </div>
    );
};
