import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { ProductSlider } from './Components/ProductSlider/ProductSlider';
import { ProductsTable } from './Components/ProductsTable/ProductsTable';
import styles from './Products.module.scss';
import { IProductsPageState } from './Products.types';

const PageHeaderComponent = (props: { pageState: State<IProductsPageState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewProductButton = () => {
        // handlers
        const handleOnClick = () => {
            pageState.slider.showSliderModal.set(true);
        };

        // draw
        return (
            <Button
                label="NEW PRODUCT"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                variant="contained"
                theme="primary"
                onClick={handleOnClick}
            />
        );
    };

    // draw
    return <PageHeader title="Products" actions={[<NewProductButton key="newProductsButton" />]} />;
};

export const Products = (): ReactElement => {
    // state
    const pageState = useState<IProductsPageState>({
        products: [],
        slider: {
            showSliderModal: false,
            isEditMode: false,
        },
    });

    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <ProductsTable pageState={pageState} />
            <ProductSlider sliderState={pageState.slider} />
        </div>
    );
};
