import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { ProductSliderBase } from './Components/ProductSliderBase/ProductSliderBase';
import { ProductTable } from './Components/ProductTable/ProductTable';
import styles from './Product.module.scss';
import { IProductPageState } from './Product.types';

const PageHeaderComponent = (props: { pageState: State<IProductPageState> }) => {
    // props
    const {} = props;

    // components
    const NewProductButton = () => {
        // handlers
        const handleOnClick = () => {
            console.log('Clicked');
        };

        // draw
        return (
            <Button
                label="ADD PRODUCT"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                variant="contained"
                theme="primary"
                onClick={handleOnClick}
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
        },
    });

    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <ProductTable pageState={pageState} />
            <ProductSliderBase />
        </div>
    );
};
