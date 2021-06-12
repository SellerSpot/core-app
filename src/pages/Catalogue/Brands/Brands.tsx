import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, TButtonOnClickHandler } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './Brands.module.scss';
import { IBrandsPageState } from './Brands.types';
import { BrandsSlider } from './Components/BrandsSlider/BrandsSlider';
import { BrandsTable } from './Components/BrandsTable/BrandsTable';

const PageHeaderComponent = (props: { pageState: State<IBrandsPageState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewBrandButton = () => {
        // handlers
        const onClickHandler: TButtonOnClickHandler = () => {
            pageState.slider.showSliderModal.set(true);
        };

        // draw
        return (
            <Button
                label="NEW BRAND"
                variant="contained"
                theme="primary"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
                onClick={onClickHandler}
            />
        );
    };

    // draw
    return <PageHeader title={'Brands'} actions={[<NewBrandButton key={'newBrandButton'} />]} />;
};

export const Brands = (): ReactElement => {
    // state
    const pageState = useState<IBrandsPageState>({
        brands: [],
        slider: {
            showSliderModal: true,
            isEditMode: false,
        },
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <BrandsTable pageState={pageState} />
            <BrandsSlider sliderState={pageState.slider} />
        </div>
    );
};
