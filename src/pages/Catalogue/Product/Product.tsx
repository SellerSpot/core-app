import { useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { ProductSliderBase } from './Components/ProductSliderBase/ProductSliderBase';
import { ProductTable } from './Components/ProductTable/ProductTable';
import styles from './Product.module.scss';
import { IProductPageState } from './Product.types';

interface IPageHeaderComponentProps {
    addProductHandler: () => void;
}

const PageHeaderComponent = (props: IPageHeaderComponentProps) => {
    // props
    const { addProductHandler } = props;

    // components
    const NewProductButton = () => {
        // draw
        return (
            <Button
                label="ADD PRODUCT"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                variant="contained"
                theme="primary"
                onClick={addProductHandler}
            />
        );
    };

    // draw
    return <PageHeader title="Products" actions={[<NewProductButton key="newProductButton" />]} />;
};

export const Product = (): ReactElement => {
    // state
    const pageState = useState<IProductPageState>({
        allProducts: [],
        isLoading: true,
        sliderModal: {
            showModal: false,
            mode: 'create',
            brandSliderModal: {
                showModal: false,
                mode: 'create',
                prefillData: null,
            },
            selectCategorySliderModal: {
                showModal: false,
                categorySliderModal: {
                    showModal: false,
                    mode: 'create',
                    prefillData: null,
                    contextData: null,
                },
            },
            stockUnitSliderModal: {
                showModal: false,
                mode: 'create',
                prefillData: null,
            },
            taxBracketSliderModal: {
                showModal: false,
                mode: 'create',
                prefillData: null,
            },
            taxGroupSliderModal: {
                showModal: false,
                mode: 'create',
                prefillData: null,
            },
        },
    });

    // handlers
    const addProductHandler = () => {
        pageState.sliderModal.merge({
            showModal: true,
            mode: 'create',
            prefillData: null,
        });
    };

    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent addProductHandler={addProductHandler} />
            <ProductTable pageState={pageState} />
            <ProductSliderBase sliderModalState={pageState.sliderModal} />
        </div>
    );
};
