import Icon from '@iconify/react';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Inventory.module.scss';
import { Button } from '../../../../.yalc/@sellerspot/universal-components/dist';
import { useState } from '@hookstate/core';
import { IInventoryPageState } from './Inventory.types';
import { InventoryTable } from './Components/InventoryTable/InventoryTable';
import { InventorySliderModalBase } from './Components/InventorySliderModalBase/InventorySliderModalBase';

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
        products: [
            {
                product: {
                    id: '610a2bb0c168b91308cb9184',
                    name: 'Andre The Giant',
                    description: 'Sample Product',
                    barcode: '123412341234213',
                    brand: {
                        id: '610288513988c34a4cd03cde',
                        name: 'Immi',
                    },
                    category: {
                        id: '61054ff2776506558451d83e',
                        title: 'Roror',
                    },
                    stockUnit: {
                        id: '610157284c73b363c8e6b600',
                        name: 'Kilogram(s)',
                        unit: 'kg(s)',
                    },
                },
                isActive: true,
                tags: ['asdfas'],
                stock: 200,
                isTrack: true,
                markup: 45,
                landingCost: 1000,
                mrp: 500,
                sellingPrice: 700,
                outlet: {
                    id: 'asdfasdf',
                    name: 'Main Outlet',
                    address: '12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1',
                },
                taxSetting: {
                    id: '610cc0a2f5e9401d2098b183',
                    name: 'Taiulu',
                    rate: 12,
                },
            },
        ],
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

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent addToInventoryCallback={addToInventoryHandler} />
            <InventoryTable inventory={pageState.products.get()} />
            <InventorySliderModalBase sliderModalState={pageState.sliderModal} />
        </div>
    );
};
