import { AsyncCreatableSelect, IAsyncCreatableSelectProps } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import styles from './InventoryModalSearchField.module.scss';

export const InventoryModalSearchField = (): ReactElement => {
    // handlers
    const loadOptionsHandler: IAsyncCreatableSelectProps['loadOptions'] = async () => {
        return [
            {
                label: 'Product 1',
                value: 'asdfasdfasdfasdf',
            },
        ];
    };

    // draw
    return (
        <div className={styles.wrapper}>
            <AsyncCreatableSelect
                label="Search for Products"
                autoFocus
                loadOptions={loadOptionsHandler}
            />
        </div>
    );
};
