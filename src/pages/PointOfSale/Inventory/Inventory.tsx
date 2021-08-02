import Icon from '@iconify/react';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Inventory.module.scss';
import { Button } from '../../../../.yalc/@sellerspot/universal-components/dist';
import { useState } from '@hookstate/core';
import { IInventoryPageState } from './Inventory.types';
import { InventoryTable } from './Components/InventoryTable/InventoryTable';

const PageHeaderComponent = () => {
    // actions
    const AddToInventoryButton = () => {
        // draw
        return (
            <Button
                label="ADD TO INVENTORY"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                theme="primary"
                variant="contained"
            />
        );
    };

    // draw
    return (
        <PageHeader
            title="Inventory"
            actions={[<AddToInventoryButton key="addToInventoryButton" />]}
        />
    );
};

export const Inventory = (): ReactElement => {
    // state
    const pageState = useState<IInventoryPageState>({
        inventory: [],
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent />
            <InventoryTable inventory={pageState.inventory.get()} />
        </div>
    );
};
