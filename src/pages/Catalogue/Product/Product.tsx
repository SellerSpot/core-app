import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { ProductSlider } from './Components/ProductSlider/ProductSlider';
import { ProductTable } from './Components/ProductTable/ProductTable';
import styles from './Product.module.scss';
import { IProductPageState } from './Product.types';

const PageHeaderComponent = (props: { pageState: State<IProductPageState> }) => {
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
    return <PageHeader title="Products" actions={[<NewProductButton key="newProductButton" />]} />;
};

export const Product = (): ReactElement => {
    // state
    const pageState = useState<IProductPageState>({
        products: [],
        slider: {
            showSliderModal: false,
            isEditMode: false,
        },
    });

    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <ProductTable pageState={pageState} />
            <ProductSlider sliderState={pageState.slider} />
        </div>
    );
};
