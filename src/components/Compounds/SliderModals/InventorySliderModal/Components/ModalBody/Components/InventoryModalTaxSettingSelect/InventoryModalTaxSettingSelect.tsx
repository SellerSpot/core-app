import { AsyncCreatableSelect, ISelectOption } from '@sellerspot/universal-components';
import { IInventorySliderModalForm } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';

export const InventoryModalTaxSettingSelect = (): ReactElement => {
    // props
    const fieldName: keyof IInventorySliderModalForm = 'taxSettingId';

    // handlers
    const loadOptionsHandler = async (): Promise<ISelectOption[]> => {
        return [];
    };

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value, onChange } = input;

    // draw
    return (
        <AsyncCreatableSelect
            loadOptions={loadOptionsHandler}
            value={value}
            label="Tax Setting"
            onChange={onChange}
        />
    );
};
