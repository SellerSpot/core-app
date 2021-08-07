import React from 'react';
import { ReactElement } from 'react';
import { ISelectOption } from '@sellerspot/universal-components';
import { AsyncCreatableSelect } from '@sellerspot/universal-components';

export const InventoryModalTaxSettingSelect = (): ReactElement => {
    // handlers
    const loadOptionsHandler = async (): Promise<ISelectOption[]> => {
        return [];
    };

    // draw
    return <AsyncCreatableSelect loadOptions={loadOptionsHandler} label="Tax Setting" />;
};
