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
        tableIsLoading: true,
        sliderModal: {
            showModal: false,
            mode: 'create',
            prefillData: null,
            allOutlets: [],
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
    const getAllInventoryProducts = async () => {
        const allProducts = await InventoryService.getAllProducts();
        pageState.products.set(allProducts);
        pageState.tableIsLoading.set(false);
    };
    const getAllOutlets = async () => {
        const allOutlets = await InventoryService.getAllOutlets();
        pageState.sliderModal.allOutlets.set(allOutlets);
    };

    // effects
    useEffect(() => {
        getAllInventoryProducts();
        getAllOutlets();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent addToInventoryCallback={addToInventoryHandler} />
            <InventoryTable
                pageState={pageState}
                getAllInventoryProducts={getAllInventoryProducts}
            />
            <InventorySliderModalBase sliderModalState={pageState.sliderModal} />
        </div>
    );
};
