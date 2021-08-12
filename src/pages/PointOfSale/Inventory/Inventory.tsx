import Icon from '@iconify/react';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Inventory.module.scss';
import { Button } from '../../../../.yalc/@sellerspot/universal-components/dist';
import { useState } from '@hookstate/core';
import { IInventoryPageState } from './Inventory.types';
import { InventoryTable } from './Components/InventoryTable/InventoryTable';
import { InventorySliderModalBase } from './Components/InventorySliderModalBase/InventorySliderModalBase';
import { InventoryService } from 'pages/PointOfSale/Inventory/Inventory.service';

interface IPageHeaderComponentProps {
    addToInventoryCallback: () => void;
}

const PageHeaderComponent = (props: IPageHeaderComponentProps) => {
    // props
    const { addToInventoryCallback } = props;

    // actions
    const AddToInventoryButton = () => {
        // draw
        return (
            <Button
                label="ADD TO INVENTORY"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                theme="primary"
                variant="contained"
                onClick={addToInventoryCallback}
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
        products: [],
        sliderModal: {
            showModal: false,
            mode: 'create',
            prefillData: null,
        },
    });

    // handlers
    const addToInventoryHandler = () => {
        pageState.sliderModal.merge({
            showModal: true,
            mode: 'create',
            prefillData: null,
        });
    };
    const getAllProducts = async () => {
        const allProducts = await InventoryService.getAllProducts();
        pageState.products.set(allProducts);
    };

    // effects
    useEffect(() => {
        getAllProducts();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent addToInventoryCallback={addToInventoryHandler} />
            <InventoryTable inventory={pageState.products.get()} />
            <InventorySliderModalBase sliderModalState={pageState.sliderModal} />
        </div>
    );
};
